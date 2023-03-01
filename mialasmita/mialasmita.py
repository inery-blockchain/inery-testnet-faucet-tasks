import os
import json
import datetime as dt
import pytz
from dotenv import load_dotenv
from api.cline_transaction import cline_transaction
from api import keys_transaction
from api.utils_transaction import *

load_dotenv()

def galer_kali():
    inery = cline_transaction()

    acc = os.environ["INERY_ACCOUNT"]
    pk = os.environ["PRIVATE_KEY"]

    args = { "id": 1635, "user": acc, "data": "data 1635" }
    pl = {
        "account": acc,
        "name": "transaction",
        "authorization": [{
            "actor": acc,
            "permission": "active"
        }]
    }

    d = inery.abi_json_to_bin(acc, "transaction", args)
    pl['data'] = d['binargs']

    tx = {"actions": [pl]}
    tx['expiration'] = str((dt.datetime.utcnow() + dt.timedelta(seconds=60)).replace(tzinfo=pytz.UTC))

    print("============ TRANSACTIONS ===============")
    print(json.dumps(tx, indent=4))

    key = keys_transaction.INRKey(pk)

    resp = inery.push_transaction(tx, key, broadcast=True)

    print("============ TRANSACTION LOGS ===============")
    print(json.dumps(resp, indent=4))

if __name__ == "__main__":
    galer_kali()