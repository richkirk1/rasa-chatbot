# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions
from dataclasses import dataclass
from json import load
from logging import Logger, getLogger
from typing import Any, Dict, Final, List, Optional, Text

from rasa_sdk import Action, FormValidationAction, Tracker
from rasa_sdk.events import AllSlotsReset
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.types import DomainDict
from sqlalchemy import create_engine, select
from sqlalchemy.orm import Session

from .states import state_code_to_state_name, state_name_to_state_code
from .models import JobPosting

LOGGER: Final[Logger] = getLogger(__name__)

engine = create_engine(f"sqlite:///job_postings.db")
session = Session(engine)


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
        location: str
        salary: str

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
            salary=tracker.get_slot("salary"),
        )

    def searchForJobs(self, search: JobSearch, offset: int) -> JobPosting:
        return session.scalars(
            statement=(
                select(JobPosting)
                .where(
                    JobPosting.title.in_([search.title.title()])
                    & JobPosting.region.in_([state_name_to_state_code[search.location]])
                    & JobPosting.salary.in_([int(search.salary)])
                )
                .order_by(JobPosting._id)
                .limit(1)
                .offset(offset)
            )
        ).all()

    def outputJobSearch(
        self, dispatcher: CollectingDispatcher, postings: list[JobPosting]
    ) -> None:
        """Output important data of a JobPosting

        Args:
            dispatcher (CollectingDispatcher): Rasa class used to generate responses to send back to user
        """
        if postings:
            dispatcher.utter_message(
                text=f"{postings[0].title}, {postings[0].company}, {postings[0].region}, {postings[0].locality}"
            )
        else:
            dispatcher.utter_message(text="There were no jobs found")

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[str, Any],
    ) -> List[Dict[str, Any]]:
        search = self.buildJobSearch(tracker=tracker)
        postings = self.searchForJobs(search=search, offset=0)
        self.outputJobSearch(dispatcher=dispatcher, postings=postings)
        return []


class ResetAllSlots(Action):
    def name(self):
        return "action_reset_all_slots"

    def run(self, dispatcher, tracker, domain):
        ValidateJobSearchForm.filled_slots = set()
        return [AllSlotsReset()]
