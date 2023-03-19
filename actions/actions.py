# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions
import meilisearch
from dataclasses import dataclass
from json import load
from logging import Logger, getLogger
from typing import Any, Dict, Final, List, Optional, Text
from rasa_sdk import Action, FormValidationAction, Tracker
from rasa_sdk.events import AllSlotsReset
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.types import DomainDict

LOGGER: Final[Logger] = getLogger(__name__)

client = meilisearch.Client('http://meilisearch:7700')
jobs = load(open('jobs.json'))
client.index('jobs').add_documents(jobs)

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


class ActionSearchJobs(Action):
    @dataclass
    class JobSearch:
        title: str

    def name(self) -> str:
        return "action_search_jobs"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[str, Any],
    ) -> List[Dict[str, Any]]:
        dispatcher.utter_message(text=client.index('jobs').search('.NET'))
        return []

class ResetAllSlots(Action):
    def name(self):
        return "action_reset_all_slots"

    def run(self, dispatcher, tracker, domain):
        ValidateJobSearchForm.filled_slots = set()
        return [AllSlotsReset()]
