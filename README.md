# rasa-chatbot

## Installation

- Git clone from repo (ONLY NEED TO DO THIS ONCE)

    ```{bash}
    git clone https://github.com/richkirk1/rasa-chatbot.git [<directory>]
    ```

- Create virtual environment (ONLY NEED TO DO THIS ONCE)

    ```{bash}
    python3 -m venv .venv
    ```

- Activate virtual environment (DO THIS EVERYTIME)

    ```{bash}
    source .venv/bin/activate
    ```

- Install required dependencies (including [rasa](https://rasa.com/docs/rasa/installation/installing-rasa-open-source/)) (ONLY NEED TO DO THIS ONCE)

    ```{bash}
    pip install --upgrade pip
    pip install -r requirements.txt
    python3 -m spacy download en_core_web_md
    pip install -e .
    ```

## Usage

### Training

```{bash}
rasa train
```

### Interacting
First, run:
```{bash}
rasa run actions
```

In a separate terminal:
```{bash}
rasa shell
```



### Testing

```{bash}
rasa test core
rasa test nlu
```
Postman team invite link (Used for testing forms in Rasa.):

https://app.getpostman.com/join-team?invite_code=ae63c809e8616e50c5c94b91255b829f&target_code=41bbf45353989a78c905f0cf2ea92392
