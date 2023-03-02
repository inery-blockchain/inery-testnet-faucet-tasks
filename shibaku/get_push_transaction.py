from sc.cline_sc import Cline
from sc import keys_sc
import json
import os
from dotenv import load_dotenv
from sc.utils_sc import *


url = os.getenv("INERY")
pkey = os.getenv("KEY")

load_dotenv()
cli = Cline()
key = keys_sc.INRKey(pkey)

action_data = {
    "from": "shibaku",  
    "to": "inerynewyorkio",
    "quantity": "3 EXITO",
    "message":  "DONE"
}

action_payload = {
    "account": "shibaku",
    "name": "transaction",
    "authorization": [{
        "actor": "shibaku",
        "permission": "active"
    }]
}
data = cli.abi_json_to_bin(action_payload['account'], action_payload['name'], action_data); action_payload['data'] = data['binargs']

tx_push = {"actions": [action_payload]}

push_transaction = cli.push_transaction(tx_push, key, broadcast=True)

print(push_transaction)
