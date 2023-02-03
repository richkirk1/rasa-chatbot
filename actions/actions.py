# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions
from typing import Any, Dict, List, Text

from rasa_sdk import Action, FormValidationAction, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.types import DomainDict

ALLOWED_JOB_TITLES = ["IT", "software development"]


class ValidateJobSearchForm(FormValidationAction):
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

        if slot_value not in ALLOWED_JOB_TITLES:
            dispatcher.utter_message(
                text=f"We only accept jobs of type: {ALLOWED_JOB_TITLES}."
            )
            return {"title": None}
        dispatcher.utter_message(
            text=f"OK! I will look for jobs in {slot_value}."
        )
        return {"title": slot_value}


class ActionSearchJobs(Action):
    def name(self) -> str:
        return "action_search_jobs"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[str, Any],
    ) -> List[Dict[str, Any]]:
        dispatcher.utter_message(text="Here is job")
        return []
