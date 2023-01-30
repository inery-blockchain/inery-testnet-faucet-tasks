from api.keys import INRKey
from api.types import *
from api.utils import *
from api.keys import *

# Replace with your own EOSIO HTTP API endpoint
url = "https://your-nodeos-endpoint.com"

# Replace with the account that will create the token
creator = "youraccount"

# Replace with the name of the new token
token_name = "yourtoken"

# Replace with the maximum supply of the new token
max_supply = "10000.0000 SYS"

# Import the private key of the creator account
private_key_wif = "5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3"
inr_key = INRKey(private_str=private_key_wif)

# Instantiate the Cline class
cline = Cline(url)

# Get the latest irreversible block number
info = cline.get_info()
lib = info['last_irreversible_block_num']

# Build the transaction
actions = [{
        "account": "eosio",
        "name": "newaccount",
        "authorization": [{
            "actor": creator,
            "permission": "active"
        }],
        "data": {
            "creator": creator,
            "name": token_name,
            "owner": {
                "threshold": 1,
                "keys": [{
                    "key": inr_key.to_public(),
                    "weight": 1
                }],
                "accounts": [],
                "waits": []
            },
            "active": {
                "threshold": 1,
                "keys": [{
                    "key": inr_key.to_public(),
                    "weight": 1
                }],
                "accounts": [],
                "waits": []
            }
        }
    },
    {
        "account": "eosio.token",
        "name": "create",
        "authorization": [{
            "actor": creator,
            "permission": "active"
        }],
        "data": {
            "issuer": creator,
            "maximum_supply": max_supply
        }
    },
    {
        "account": token_name,
        "name": "issue",
        "authorization": [{
            "actor": creator,
            "permission": "active"
        }],
        "data": {
            "to": creator,
            "quantity": max_supply,
            "memo": "issue"
        }
    }
]

# Sign and send the transaction
tx = cline.abi_json_to_bin(actions)
signed_tx = cline.sign_transaction(tx, inr_key)
response = cline.push_transaction(signed_tx)

# Print the transaction ID
print("Transaction ID: ", response['transaction_id'])
