from api import keys
from api.cline import Cline
from api.utils import *
import datetime as dt
import pytz
import json
import os

load_dotenv()

node_url =  os.environ("node_url")
private_key = os.environ("private_keys")

def transaction():
    inery = Cline

args = { "id": 1254, "user": account, "data": "data 1254" }

action_data = {
    "account": "lannn",
    "name": "send_transaction",
    "authorization": [{
        "actor": "lannn",
        "permission": "active" 
   
    }]
}
     data =  inery.abi_json_to_bin(account, "create", args)
    payload['data'] = d['binargs']


    key = keys.INRKey(key)

    resp = inery.push_transaction(tx, key, broadcast=True)

    print(json.dumps(tx, indent=4))
    print(json.dumps(resp, indent=4))

if __name__ == "__main__":
    transaction()


