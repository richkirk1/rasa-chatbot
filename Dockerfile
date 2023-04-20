# Extend the official Rasa SDK image
FROM rasa/rasa-sdk:latest

# Change back to root user to install dependencies
USER root

# Upgrade pip
RUN pip install --upgrade pip

# To install packages from PyPI
RUN pip install --no-cache-dir black && \
    pip install --no-cache-dir nltk && \
    pip install --no-cache-dir spacy && \
    pip install --no-cache-dir isort && \
    pip install --no-cache-dir meilisearch && \
    pip install --no-cache-dir sqlalchemy

# Switch back to non-root to run code
USER 1001
