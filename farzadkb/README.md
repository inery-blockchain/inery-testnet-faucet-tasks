# INERY Blockchain Contacts dApp

## Introduction

A simple application with the ability to add, edit and delete contacts

### Compile the Smart Contract

Type below commands to generate the WAST & ABI file:

```bash
$ cd contacts
$ inery-cpp ./contacts.cpp -o ./contacts.wasm
```

### Deploy and run the Smart Contract

This includes the source code of the INERY Smart Contract which to simulate a simple contacts list.

```bash
$ cd contacts
$ cline set contract YOUR_ACCOUNT_NAME ./
```

## Run the webapp at your Inery node server

In addition to the above prerequisites, you'll need below software installed to run the webapp:

- Python 3.6+
- Pip3 9.0+
- (Virtualenv)[https://virtualenv.pypa.io/en/latest/installation.html] 16+
- Npm 3.5+

Install the python3 & pip3

```bash
$ sudo apt-get update
$ sudo apt-get install python3.9
$ sudo apt-get -y install python3-pip
$ sudo pip install virtualenv
$ sudo apt-get install nodejs
$ sudo apt-get install npm
```

### Config and run the webapp

Before run the webapp, you'll need to change INERY config file at `webapp/inery-config.ini`. Put your INERY wallet name and password & account name in there:

```ini
[DEFAULT]
USERNAME = you_account_name
WALLET_NAME = your_wallet_name
WALLET_PASSWORD = your_wallet_password
```

Install the python dependencies in the first time:

```bash
$ cd webapp
$ source venv/bin/activate
$ pip install -r requirements.txt
```

Start the web server:

```bash
$ npm start
```

Browse the `http://IP:5000` to run the demo.

If it not accessible in browser enter this command before `npm start`

```bash
$ export FLASK_RUN_HOST=0.0.0.0
```

### Demo
You can see a demo in [HERE](http://inery-dapp.dumanim.tech:5000/).
