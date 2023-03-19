## Prerequisites

To use this script, you need to have the following installed:

* Python 3.x

* ` cleos`  command-line interface

* ` dotenv`  Python package

## Installation

To install the required Python packages, run

```
pip install -r requirements.txt
```

## Usage

To use the script, you need to set the following environment variables:

* `INERY_ACCOUNT`: The EOSIO account that will be used to create and read data on the blockchain.

* `PRIVATE_KEY`: The private key of the  that will be used to sign transactions.`INERY_ACCOUNT`

## You can then run the script using

```
python node.py
```

The script will create a new record on the blockchain with the ID 1 and some sample data. It will then read the data from the blockchain and print it to the console.
