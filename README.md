# rasa-chatbot

## Installation (First Time Setup)

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

- Install required dependencies (including [rasa](https://rasa.com/docs/rasa/installation/installing-rasa-open-source/) & [node.js](https://nodejs.org/en/))

#### Rasa

```{bash}
pip install --upgrade pip
pip install -r requirements.txt
python3 -m spacy download en_core_web_md
pip install -e .
```

#### Meilisearch

```{bash}
curl -L https://install.meilisearch.com | sh
```
https://docs.meilisearch.com/learn/getting_started/quick_start.html
#### Node.js

```{bash}
npm i --prefix ./interface react-simple-chatbot
npm i --prefix ./interface socket.io-client
npm i --prefix ./interface styled-components
```

## Usage (How to Run this chatbot)

### Rasa

To train a model, use `rasa train` (this will take a significant amount of time; if you wish to train it faster, try the command with `--augmentation 0`).

First set up the action server in a separate terminal window:

```{bash}
rasa run actions
```

These are custom actions that require connections to external services and what not.

In another terminal window, run the bot:

```{bash}
rasa shell --debug
```

In the last terminal window, run meilisearch:
```{bash}
./meilisearch
```

The `--debug` flag produces a lot of output meant to help understand how the bot is working under the hood. To have a normal conversation, run without the `--debug` flag.

### Interface

To run the interface you will need three seperate terminals.

First set up the action server:
```{bash}
rasa run actions
```

In the second terminal we will need run rasa on a live server.
```{bash}
rasa run --cors "*"
```

In the third terminal window we will set up a local server for the interface to run. It is important that you are within the interface directory when running this command.
```{bash}
npm start
```

## Testing

After running `rasa train`, run the command:

```{bash}
rasa test core
rasa test nlu
```

### Postman

Postman is a service for testing APIs, is useful for testing Rasa custom actions and Rasa forms.

Here is a Postman team invite link:

<https://app.getpostman.com/join-team?invite_code=ae63c809e8616e50c5c94b91255b829f&target_code=41bbf45353989a78c905f0cf2ea92392>

To test with postman, first run the actions server:

```{bash}
rasa run actions
```

In another terminal window, run the bot server:

```{bash}
rasa run --enable-api --debug
```

Then, in the postman UI, you can run tests on the Collections (<https://learning.postman.com/docs/running-collections/intro-to-collection-runs/>).

## File Overview

`data/` - contains stories, rules, and nlu (training data)

`actions/` - contains custom action code

`domain.yml` - the domain file, including bot response templates

`config.yml` - training configurations for the NLU pipeline and policy ensemble

## Deployment

GCP STEPS

 1. Create a new project
    - https://console.cloud.google.com/cloud-resource-manager
 2. Create a brand spanken new vm
    - https://console.cloud.google.com/compute/instances
 3. Reserve static ip for vm
    - https://console.cloud.google.com/networking/addresses
 4. Set UNSAFE firewall rule (can fix later)
    - https://console.cloud.google.com/networking/firewalls
 5. Create new rule w/ properties:
      - Target: all instances
      - Direction: ingress
      - Source IP ranges: 0.0.0.0/0
      - Ports and protocols: allow all

VM STEPS

 1. Update and upgrade
    - sudo apt update
    - sudo apt upgrade
 2. Install git
    - sudo apt install git
 3. Clone the relevant repository
    - git clone [URL]
 4. Install docker
    - sudo apt install docker
 5. Train model & build rasa-server WARNING: High Server Impact
    - sudo docker build -t rasa:latest .
 6. Build action-server
    - sudo docker build -t actions:latest ./actions
 7. Build the react interface and apache-server
    - sudo docker build -t interface:latest ./interface
 8. Create Docker Network
    - sudo docker network create deployment-network
 9. Run meli-server
    - sudo docker run -it -d --rm --network deployment-network -p 7700:7700 --name meili-server -v $(pwd)/meili_data:/meili_data getmeili/meilisearch:v1.1
 10. Run actions server
    - sudo docker run -d --rm -v "$PWD"/actions:/app/actions --network deployment-network -p 5055:5055 --name action-server actions:latest
 11. Run Rasa server
    - sudo docker run -it -d --rm --network deployment-network -p 5005:5005 --name rasa-server rasa:latest
 12. Run apache server
    - sudo docker run -d --rm --name apache-container -p 80:80 interface:latest

Helpful Docker commands:

 - List containers
    - sudo docker container ls -a
 - Destroy all containers
    - sudo docker rm -f $(sudo docker ps -a -q)
 - Check used docker space
    - sudo du -sh /var/lib/docker
 - Destroy EVERYTHING
    - sudo docker system prune -a -f --volumes

## Development

To develop code for this bot:

- First activate the virtual environment

    ```{bash}
    source .venv/bin/activate
    ```

- If you haven't already, install the required packages

    ```{bash}
    pip install --upgrade pip
    pip install -r requirements.txt
    python3 -m spacy download en_core_web_md
    pip install -e .
    ```

- Create a new branch, either through extensions or via the terminal (`git checkout -b <branch_name>`)

- Make changes as necessary and make commits

- Push the local branch with changes to the remote repo:

    ```{bash}
    git push -u origin <branch-name>
    ```



- Submit a PR following this guide (<https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request?tool=webui>)
