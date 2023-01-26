# IneryPy

Python library for interacting with the Inery blockchain using Remote Procedure Calls (RPC). It allows developers to easily create and manage smart contracts, send and receive tokens, and interact with the Inery blockchain using Python. Its main features include support for signing transactions, creating and triggering contract actions and providing an easy-to-use tool for Python developers to interact with the Inery blockchain database. The primary purpose of Inerypy is to provide an easy and convenient way for Python developers to interact with the Inery blockchain.

## Features 


- Easy-to-use CLI object: Our library provides a simple and intuitive command-line interface (CLI) object that makes it easy for developers to interact with the Inery node endpoint.

- Flexible request handling: Our CLI object can handle two main types of requests, including GET and POST, allowing for a wide range of functionality.

- Automatic parsing of HTTPS responses: Our library takes care of parsing HTTPS responses from the blockchain endpoint, so you can focus on your application logic.

- Support for Inery blockchain protocol: Designed to work with an Inery blockchain protocol, excelent tool for developers.

- Built-in error handling: Our CLI object includes built-in error handling to ensure that your application can handle and recover from errors gracefully.


## Installation 

1. Make sure you have Python 3.x installed on your system. You can check your version by running `python3 --version`

2. Install the library using pip3 by running the following command in your command line: `pip3 install IneryPy`

3. To install the library from source, you can download the source code from this repository


## Functions 

- get_info(): This function returns general information about the blockchain, such as the current block height and the chain ID.
- get_chain_lib_info(): This function returns both general blockchain information and information about the last irreversible block.
- get_block(): This function returns information about a specific block, given its block number.
- get_account(): This function returns information about a specific account, given its name.
- get_code(): This function returns the code of a specific account, given its name.
- get_accounts(): This function returns a list of accounts associated with a specific public key.
- get_abi(): This function returns the ABI (Application Binary Interface) of a specific account, given its name.
- get_raw_abi(): This function returns the raw ABI of a specific account, given its name.
- get_actions(): This function returns a list of actions associated with a specific account.
- get_currency(): This function returns information about a specific currency, given its code and symbol.
- get_currency_balance(): This function returns the balance of a specific currency for a specific account.
- get_currency_stats(): This function returns statistics about a specific currency, given its code and symbol.
- get_servants(): This function returns a list of accounts controlled by a specific account.
- get_transaction(): This function returns information about a specific transaction, given its ID.

## Documentation

The api.cline Cline is a command line interface object that allows you to use RPC API functions to communicate with blockchain API endpoints. It includes a DynamicUrl class that creates the url for the API endpoint based on the function that is called, and a Cline class that handles the actual communication with the endpoint.

The Cline class has several "get" methods, such as get_info, get_block, get_account, get_code, and get_accounts, that can be used to retrieve information from the blockchain.

In order to use this library, you will first need to import it and create an instance of the Cline class, passing in the url of the blockchain API endpoint and the version of the API that you want to use. Then, you can call the various "get" methods on this instance to retrieve the information that you need.

For example, the get_info method can be used to retrieve information about the blockchain, such as the head block number, the last irreversible block number, and the current block master.

```py
from api.cline import Cline

cli = Cline(url="https://tas.blockchain-servers.world")

get_info = cli.get_info()
print(get_info)

current_block = get_info["head_block_id"]

# retrieve a specific block from the blockchain
block = cli.get_block(current_block)
master = block["master"]
block_num = block["block_num"]
print(f"Last block was {block_num} and owned by master {master} ")

```

### Example of push transaction

```py
from api.cline import Cline
from api.keys import INRKey
import json


cli = Cline(url='https://tas.blockchain-servers.world')

action_data = {
    "from": "inery.master",  
    "to": "inery.stake",
    "quantity": '1.0000 INR',  
    "memo": "Standard INR transfer",
}

action_payload = {
    "account": "inery.token",
    "name": "transfer",
    "authorization": [{
        "actor": "inery.master",
        "permission": "owner"
    }]
}
# Converting payload to binary
data = cli.abi_json_to_bin(action_payload['account'], action_payload['name'], action_data)
# Inserting payload binary form as "data" field in original action payload
action_payload['data'] = data['binargs']

# final transaction formed
trx = {"actions": [action_payload]}

# use Inery key for signing transaction
key = INRKey('AUTHORIZATION_PRIVATE_KEY')
out = cli.push_transaction(trx, key, broadcast=True)
print('================================================')
print(out)
print('================================================')


```
