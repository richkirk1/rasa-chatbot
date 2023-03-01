# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions
from dataclasses import dataclass
from json import load
from logging import Logger, getLogger
from typing import Any, Dict, Final, List, Optional, Text

from nltk.stem.snowball import SnowballStemmer
from rasa_sdk import Action, FormValidationAction, Tracker
from rasa_sdk.events import AllSlotsReset
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.types import DomainDict

LOGGER: Final[Logger] = getLogger(__name__)
STEMMER = SnowballStemmer("english")

with open("./data/jobs.json") as f:
    data = load(f)


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
                text=f"Looking for a job can be ruff, but don't worry! We can work together to find the perfect job for you.  {slot_value}"
            )
            return {"title": slot_value}


class ActionSearchJobs(Action):
    @dataclass
    class JobSearch:
        title: str

    @dataclass
    class JobPosting:
        ID: int
        Title: str
        Company: str
        Duration: str
        Location: str
        JobDescription: str
        JobRequirment: str
        RequiredQual: str
        Salary: str
        AboutC: str

    def name(self) -> str:
        return "action_search_jobs"

    def buildJobSearch(self, tracker: Tracker) -> JobSearch:
        """Build JobSearch dataclass from filled slots

        Args:
            tracker (Tracker): Rasa class that represents the current state of the bots memory

        Returns:
            JobSearch: dataclass that contains information for searching
        """
        return self.JobSearch(title=STEMMER.stem(tracker.get_slot("title")))

    def searchForJobs(self, search: JobSearch) -> Optional[JobPosting]:
        """Query DB for records matching data from JobSearch; return the first result found

        Args:
            search (JobSearch): dataclass that contains information for searching

        Returns:
            JobPosting: all job posting data of first result found; None if not found
        """
        for record in data:
            if search.title in STEMMER.stem(record["Title"].lower()):
                return self.JobPosting(**record)

        return None

    def outputJobSearch(
        self, dispatcher: CollectingDispatcher, posting: Optional[JobPosting]
    ) -> None:
        """Output important data of a JobPosting

        Args:
            dispatcher (CollectingDispatcher): Rasa class used to generate responses to send back to user
            posting (JobPosting): dataclass that contains information from a job posting
        """
        if posting:
            dispatcher.utter_message(
                text=f"Here is a job matching your criteria:\n{posting.Title},\n{posting.Company},\n{posting.JobDescription}"
            )
        else:
            dispatcher.utter_message(
                text=f"Sorry, we could not find a job matching your search criteria."
            )

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[str, Any],
    ) -> List[Dict[str, Any]]:
        search = self.buildJobSearch(tracker=tracker)
        posting = self.searchForJobs(search=search)
        self.outputJobSearch(dispatcher=dispatcher, posting=posting)
        return []


class ResetAllSlots(Action):
    def name(self):
        return "action_reset_all_slots"

    def run(self, dispatcher, tracker, domain):
        ValidateJobSearchForm.filled_slots = set()
        return [AllSlotsReset()]
