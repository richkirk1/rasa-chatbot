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
    pip3 install -r requirements.txt
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
