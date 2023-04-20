# Extend the official Rasa SDK image
FROM rasa/rasa-sdk:latest

# Change back to root user to install dependencies
USER root

# Upgrade pip
RUN pip install --upgrade pip
# To install packages from PyPI
RUN pip install --no-cache-dir --verbose -r requirements-actions.txt

# Switch back to non-root to run code
USER 1001
