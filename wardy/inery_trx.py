import os
import json
import datetime as dt
import pytz
from dotenv import load_dotenv
from api.cline_trx import cline_trx
from api import keys_trx
from api.utils_trx import *

load_dotenv()

def coli_dong():
    inery = cline_trx()

    acc = os.environ["INR_ACC"]
    pk = os.environ["INR_PKEY"]

    args = { "id": 1520, "user": acc, "data": "data 1520" }
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

    key = keys_trx.INRKey(pk)

    resp = inery.push_transaction(tx, key, broadcast=True)

    print("============ TRANSACTION LOGS ===============")
    print(json.dumps(resp, indent=4))

if __name__ == "__main__":
    coli_dong()