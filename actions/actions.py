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
from fuzzywuzzy import process
from rasa_sdk.events import SlotSet
from typing import Any, Text, Dict, List

import collections
import sqlite3
import random

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
                text=f"Okay, we will look for a job as {slot_value}"
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
        return "action_cumulative_search"

    def required_slots(tracker: Tracker) -> List[Text]:
        return ["job_title", "location"]

    def slot_mappings(self) -> Dict[Text, Any]:
        return {
            "title": [self.from_text()],
            "location": [self.from_text()],
        }

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[str, Any],
    ) -> List[Dict[str, Any]]:
        """Execute the logic of a function
        Args: 
            tracker: object that contains info about the chat history and cuurrent state of the dialogue
        Returns:
            a list of SlotSet and/or Event objects
        """
        """
        Runs a query using both the title & location columns (fuzzy matching against the
        relevent slots). Finds a match for both if possible, otherwise a match for the
        title only, location only in that order. Output is an utterance directly to the
        user with a randomly selected matching row.
        """
        conn = DbQueryingMethods.create_connection(db_file="./data/jobs.json")

        # get matching entries for title
        title_value = tracker.get_slot("title")
        # make sure we don't pass None to our fuzzy matcher
        if title_value == None:
            title_value = " "
        title_name = "Title"
        title_value = DbQueryingMethods.get_closest_value(conn=conn,
            slot_name=title_name,slot_value=title_value)[0]
        query_results_title = DbQueryingMethods.select_by_slot(conn=conn,
            slot_name=title_name,slot_value=title_value)

        dispatcher.utter_message(text = "Where do you prefer to work?")
        # get matching for location
        resource_topic_value = tracker.get_slot("location")
        # make sure we don't pass None to our fuzzy matcher
        if location_value == None:
            location_value = " "
        location_name = "Location"
        location_value = DbQueryingMethods.get_closest_value(conn=conn,    
            slot_name=location_name,slot_value=location_value)[0]
        query_results_location = DbQueryingMethods.select_by_slot(conn=conn,
            slot_name=location_name,slot_value=location_value)

        # intersection of two queries
        title_set = collections.Counter(query_results_title)
        location_set =  collections.Counter(query_results_location)

        query_results_overlap = list((title_set & location_set).elements())

        # apology for not having the right info
        apology = "I couldn't find exactly what you wanted, but you might like this."

        # return info for both, or topic match or type match or nothing
        if len(query_results_overlap)>0:
            return_text = DbQueryingMethods.rows_info_as_text(query_results_overlap)
        elif len(list(query_results_title))>0:
            return_text = apology + DbQueryingMethods.rows_info_as_text(query_results_title)
        elif len(list(query_results_location))>0:
            return_text = apology + DbQueryingMethods.rows_info_as_text(query_results_location)
        else:
            return_text = DbQueryingMethods.rows_info_as_text(query_results_overlap)
        
        # print results for user
        dispatcher.utter_message(text=str(return_text))

        title = tracker.get_slot("title")
        return [SlotSet("title", title)]

"""
class AskForLocation(Action):
    def name(self) -> Text:
        return "action_ask_location"

    def run(
        self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict[str, Any],
    ) -> List[Dict[str, Any],]:
        search = self.buildJobSearch(tracker=tracker)
        posting = self.searchForJobs(search=search)
        self.outputJobSearch(dispatcher=dispatcher, posting=posting)
        location = tracker.get_slot("location")
        return [SlotSet("location", location)]
"""

class ResetAllSlots(Action):
    def name(self):
        return "action_reset_all_slots"

    def run(self, dispatcher, tracker, domain):
        ValidateJobSearchForm.filled_slots = set()
        return [AllSlotsReset()]


class DbQueryingMethods:
    def create_connection(db_file):
        """ 
        create a database connection to the SQLite database
        specified by the db_file
        :param db_file: database file
        :return: Connection object or None
        """
        conn = None
        try:
            conn = sqlite3.connect(db_file)
        except Error as e:
            print(e)

        return conn

    def get_closest_value(conn, slot_name, slot_value):
        """ Given a database column & text input, find the closest 
        match for the input in the column.
        """
        # get a list of all distinct values from our target column
        fuzzy_match_cur = conn.cursor()
        fuzzy_match_cur.execute(f"""SELECT DISTINCT {slot_name} 
                                FROM eduresources""")
        column_values = fuzzy_match_cur.fetchall()

        top_match = process.extractOne(slot_value, column_values)

        return(top_match[0])

    def select_by_slot(conn, slot_name, slot_value):
        """
        Query all rows in the tasks table
        :param conn: the Connection object
        :return:
        """
        cur = conn.cursor()
        cur.execute(f'''SELECT * FROM eduresources
                    WHERE {slot_name}="{slot_value}"''')

        # return an array
        rows = cur.fetchall()

        return(rows)

    def rows_info_as_text(rows):
        """
        Return one of the rows (randomly selcted) passed in 
        as a human-readable text. If there are no rows, returns
        text to that effect.
        """
        if len(list(rows)) < 1:
            return "There are no resources matching your query."
        else:
            for row in random.sample(rows, 1):
                return f"Try the {(row[4]).lower()} {row[0]} by {row[1]}. You can find it at {row[2]}."