FROM rasa/rasa-sdk:3.4.0

WORKDIR /app/actions

COPY requirements-actions.txt requirements-actions.txt

COPY jobs.json jobs.json

USER root

RUN pip install -r requirements-actions.txt

USER 1001