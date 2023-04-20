FROM rasa/rasa:latest
WORKDIR '/app'
COPY . /app
USER root
COPY ./data /app/data
RUN pip install --upgrade pip
RUN pip install --verbose -r requirements.txt
RUN python -m spacy download en_core_web_md
RUN  rasa train
VOLUME /app
VOLUME /app/data
VOLUME /app/models
CMD ["run","-m","/app/models","--enable-api","--cors","*","--debug" ,"--endpoints", "endpoints.yml", "--log-file", "out.log", "--debug"]