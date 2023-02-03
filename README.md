# rasa-chatbot

## Installation

- Git clone from repo

    ```{bash}
    git clone https://github.com/richkirk1/rasa-chatbot.git [<directory>]
    ```

- Create virtual environment

    ```{bash}
    python3 -m venv .venv
    ```

- Activate virtual environment

    ```{bash}
    source .venv/bin/activate
    ```

- Install required dependencies (including [rasa](https://rasa.com/docs/rasa/installation/installing-rasa-open-source/))

    ```{bash}
    pip install --upgrade pip
    pip install -r requirements.txt
    python3 -m spacy download en_core_web_md
    python3 -m spacy link en_core_web_md en
    pip install -e .
    ```

## Usage

### Training

```{bash}
rasa train
```

### Interacting

```{bash}
rasa shell
```

### Testing

```{bash}
rasa test
```
