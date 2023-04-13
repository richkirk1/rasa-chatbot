# Extend the official Rasa SDK image
FROM rasa/rasa-sdk:<version>

# Change back to root user to install dependencies
USER root

# To install packages from PyPI
RUN pip install --no-cache-dir black
    && pip install --no-cache-dir nltk
    && pip install --no-cache-dir spacy
    && pip install --no-cache-dir isort

# Switch back to non-root to run code
USER 1001