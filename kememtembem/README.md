# INERY Blockchain Todo DApp

## Introduction

A simple application with the ability to add, read, edit and delete data todo.

## Dependency
```
Python 3
```


### Compile the Smart Contract

Type below commands to generate the WASM & ABI file:

```bash
$ cd todocrud
$ inery-cpp ./todocrud.cpp -o ./todocrud.wasm
```

### Deploy and run the Smart Contract

This includes the source code of the INERY Smart Contract which to simulate a simple contacts list.

```bash
$ cd todocrud
$ cline set contract YOUR_ACCOUNT_NAME ./
```

## Run the app at your Inery node server

In addition to the above prerequisites, you'll need run the requirements to install all the dependencies:

```bash
$ pip install -r REQUIREMENTS.txt
```

### Config and run the app

Before run the app, you'll need to change the env file. you need to rename `env.example` to `.env` and fill the your credentials there:

```ini
[DEFAULT]
ACCOUNT = you_account_name
PRIVATE_KEY = your_private_key
```

Start the web server:

```bash
$ python main.py
```

Browse the `http://127.0.0.1:5000/` to run the demo.


### Demo
You can see a demo in [HERE](http://65.109.4.18:5000/).