import os
import json
import datetime as dt
import pytz
from dotenv import load_dotenv
from api.cline import Cline
from api import keys
from api.utils import *

load_dotenv()

def galau_ga_tuh():
    inery = Cline()

    acc = os.environ["ACC"]
    pk = os.environ["PKEY"]

    args = { "id": 1254, "user": acc, "data": "data 1254" }
    pl = {
        "account": acc,
        "name": "create",
        "authorization": [{
            "actor": acc,
            "permission": "active"
        }]
    }

    d = inery.abi_json_to_bin(acc, "create", args)
    pl['data'] = d['binargs']

    tx = {"actions": [pl]}
    tx['expiration'] = str((dt.datetime.utcnow() + dt.timedelta(seconds=60)).replace(tzinfo=pytz.UTC))

    print("============ TRANSACTIONS ===============")
    print(json.dumps(tx, indent=4))

    key = keys.INRKey(pk)

    resp = inery.push_transaction(tx, key, broadcast=True)

    print("============ TRANSACTION LOGS ===============")
    print(json.dumps(resp, indent=4))

if __name__ == "__main__":
    galau_ga_tuh()