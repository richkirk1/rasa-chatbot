# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions
from dataclasses import dataclass
from json import load
from logging import Logger, getLogger
from typing import Any, Dict, Final, List, Optional, Text
from functools import reduce
from rasa_sdk import Action, FormValidationAction, Tracker
from rasa_sdk.events import AllSlotsReset, SlotSet, ActiveLoop
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.types import DomainDict
from sqlalchemy import create_engine, select
from sqlalchemy.orm import Session, Query

from .states import state_code_to_state_name, state_name_to_state_code
from .models import JobPosting

LOGGER: Final[Logger] = getLogger(__name__)

ENGINE = create_engine(f"sqlite:///job_postings.db")
session = Session(ENGINE)
job_postings: List[JobPosting] = []

# ======================================================== #
# ===================== Form Actions ===================== #
# ======================================================== #

class ValidateJobSearchForm(FormValidationAction):
    def name(self) -> Text:
        return "validate_job_search_form"

    async def required_slots(
        self,
        domain_slots: List[Text],
        dispatcher: "CollectingDispatcher",
        tracker: "Tracker",
        domain: "DomainDict",
    ) -> List[Text]:
        additional_slots = []
        if (
            tracker.slots.get("use_location")
            and tracker.slots.get("use_location") is True
        ):
            additional_slots.append("location")
        
        return await super().required_slots(
            domain_slots + additional_slots, dispatcher, tracker, domain
        )

    def validate_title(
        self,
        slot_value: Any,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: DomainDict,
    ) -> Dict[Text, Any]:
        """Validate `title` value."""
        dispatcher.utter_message(
            text=f"Looking for a job can be ruff, but don't worry! We can work together to find the perfect job for you."
        )
        dispatcher.utter_send_button()
        return {"title": slot_value}

    def validate_use_location(
        self,
        slot_value: Any,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: DomainDict,
    ) -> Dict[Text, Any]:
        return {"use_location": slot_value}

    def validate_location(
        self,
        slot_value: Any,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: DomainDict,
    ) -> Dict[Text, Any]:
        """Validate `location` value."""
        dispatcher.utter_message(
            text=f"Okay, we will look for a job in {state_name_to_state_code[slot_value.title()]}"
        )
        return {"location": state_name_to_state_code[slot_value.title()]}
    

# ======================================================== #
# ==================== Utility Actions =================== #
# ======================================================== #

class ActionSearchJobs(Action):
    @dataclass
    class JobSearch:
        title: str
        location: str

    def name(self) -> str:
        return "action_search_jobs"

    def buildJobSearch(self, tracker: Tracker) -> JobSearch:
        """Build JobSearch dataclass from filled slots

        Args:
            tracker (Tracker): Rasa class that represents the current state of the bots memory

        Returns:
            JobSearch: dataclass that contains information for searching
        """
        return self.JobSearch(
            title=tracker.get_slot("title"),
            location=tracker.get_slot("location"),
        )
    
    def buildJobSearchQuery(self, search: JobSearch) -> Query:
        query = session.query(JobPosting)
        if search.title:
            query = query.where(JobPosting.title.ilike(f"%{search.title}%"))
        if search.location:
            query = query.where(JobPosting.region == f"{search.location}")
        return query

    def searchForJobs(
        self, query: Query
    ) -> List[JobPosting]:
        return query.limit(25).all()

    def outputJobSearch(
        self, dispatcher: CollectingDispatcher, postings: List[JobPosting]
    ) -> List[Dict[str, Any]]:
        """Output important data of a JobPosting

        Args:
            dispatcher (CollectingDispatcher): Rasa class used to generate responses to send back to user
        """
        if postings:
            job_postings = postings
            dispatcher.utter_message(text=f"{job_postings[0].title}\n{job_postings[0].company}\n{job_postings[0].region}")
            return [SlotSet("found_jobs", True)]
        dispatcher.utter_message(text="Sorry bout that, there were no jobs found :(")
        return []

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[str, Any],
    ) -> List[Dict[str, Any]]:
        query: Query = self.buildJobSearchQuery(self.buildJobSearch(tracker=tracker))
        postings = self.searchForJobs(query=query)
        return self.outputJobSearch(dispatcher=dispatcher, postings=postings)

class ResetAllSlots(Action):
    def name(self):
        return "action_reset_all_slots"

    def run(self, dispatcher, tracker, domain):
        ValidateJobSearchForm.filled_slots = set()
        return [AllSlotsReset()]
