# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions
from .states import state_code_to_state_name, state_name_to_state_code
from meilisearch import Client
from dataclasses import dataclass
from json import load
from logging import Logger, getLogger
from typing import Any, Dict, Final, List, Optional, Text
from rasa_sdk import Action, FormValidationAction, Tracker
from rasa_sdk.events import AllSlotsReset
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.types import DomainDict

LOGGER: Final[Logger] = getLogger(__name__)

client = Client('http://localhost:7700')
jobs = load(open('./actions/jobs.json'))
client.index('jobs').add_documents(jobs)
client.index('jobs').update_filterable_attributes([
    'region',
    'locality',
    'employment_type'
])
class ValidateJobSearchForm(FormValidationAction):
    filled_slots = set()

    def name(self) -> Text:
        return "validate_job_search_form"

    def validate_title(
        self,
        slot_value: Any,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: DomainDict,
    ) -> Dict[Text, Any]:
        """Validate `title` value."""

        if "title" in self.filled_slots:
            return {}
        else:
            self.filled_slots.add("title")
            dispatcher.utter_message(
                text=f"Looking for a job can be ruff, but don't worry! We can work together to find the perfect job for you."
            )
            return {"title": slot_value}

    def validate_employment_type(
        self,
        slot_value: Any,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: DomainDict,
    ) -> Dict[Text, Any]:
        """Validate `employment_type` value."""

        if "employment_type" in self.filled_slots:
            return {}
        else:
            self.filled_slots.add("employment_type")
            return {"employment_type": slot_value}

    def validate_location(
        self,
        slot_value: Any,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: DomainDict,
    ) -> Dict[Text, Any]:
        """Validate `location` value."""

        if "location" in self.filled_slots:
            return {}
        else:
            self.filled_slots.add("location")
            return {"location": slot_value}


class ActionSearchJobs(Action):
    @dataclass
    class JobPosting:
        salary: str
        education: str
        description: str
        title: str
        skills: str
        locality: str
        posted_at: str
        longitude: int
        postalCode: str
        url: str
        experience: str
        latitude: int
        _id: str
        company: str 
        region: str
        employment_type: str
 
    @dataclass
    class JobSearch:
        title: str
        location: str
        employment_type: str

    def name(self) -> str:
        return "action_search_jobs"

    def build_job_search_query(self, tracker: Tracker) -> JobSearch:
        title = tracker.get_slot("title")
        location = tracker.get_slot("location").lower().title()
        employment_type = tracker.get_slot("employment_type")
        LOGGER.info(
            msg=f"Building query for job with title: {title}, location: {location}, employment type: {employment_type}"
        )
        return self.JobSearch(
            title=title,
            location=location,
            employment_type=employment_type
        )

    def search_jobs(self, search: JobSearch) -> List[JobPosting]:
        limit = 3
        LOGGER.info(
            msg=f"Searching with Meilisearch with a limit of {limit}"
        )
        location_filter = ''
        if search.location in state_name_to_state_code.keys():
            location_filter = f'region = "{state_name_to_state_code[search.location]}"'
        else:
            location_filter = f'locality = "{search.location}"'
        
        return [self.JobPosting(*res.values()) for res in client.index('jobs').search(query=search.title, opt_params={
            'limit': limit,
            'filter': f'employment_type = "{search.employment_type}" AND {location_filter}'
        })['hits']]

    def output_job_postings(self, postings: List[JobPosting], dispatcher: CollectingDispatcher, search: JobSearch) -> None:
        if not postings:
            LOGGER.info(
                msg="No jobs were found"
            )
            dispatcher.utter_message(text=f'Sorry, we couldn\'t find any jobs matching the following criteria: "Working {search.employment_type} as a {search.title} in {search.location}"')
            return
        
        posting_carousel = []
        for posting in postings:
            LOGGER.info(
                msg=f"{posting}"
            )

            posting_carousel.append({
                "title" : posting.title,
                "company" : posting.company,
                "description" : posting.description,
            })
            
        dispatcher.utter_message(attachment=posting_carousel)

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[str, Any],
    ) -> List[Dict[str, Any]]:
        search = self.build_job_search_query(tracker=tracker)
        postings = self.search_jobs(search=search)
        self.output_job_postings(postings=postings, dispatcher=dispatcher, search=search)
        return []




class ResetAllSlots(Action):
    def name(self):
        return "action_reset_all_slots"

    def run(self, dispatcher, tracker, domain):
        LOGGER.info(msg="Resetting all slots")
        ValidateJobSearchForm.filled_slots = set()
        return [AllSlotsReset()]
