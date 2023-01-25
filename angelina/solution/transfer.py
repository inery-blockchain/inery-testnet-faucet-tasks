from api.cline import Cline
from api import keys
import json


node_url = os.environ["node_url"]
priv_key = os.environ["priv_key"]

action_data = {
    "from": "angelina",  
    "to": "inery",
    "quantity": '1.0000 ANGEL',  
    "memo": "ANGEL Token transfer",
}

action_payload = {
    "account": "angelina",
    "name": "transfer",
    "authorization": [{
        "actor": "angelina",
        "permission": "active"
    }]
}
data = cli.abi_json_to_bin(action_payload['account'], action_payload['name'], action_data)
action_payload['data'] = data['binargs']

trx = {"actions": [action_payload]}

key = INRKey(priv_key)
out = cli.push_transaction(trx, key, broadcast=True)
print('================================================')
print(out)
print('================================================')