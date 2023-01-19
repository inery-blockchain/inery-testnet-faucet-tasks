import os
import json
import datetime as dt
import pytz
import primary
import config

from dotenv import load_dotenv
import user import user


load_dotenv()

def yahaha():
    inery = user()

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

    print("============ processS ===============")
    print(json.dumps(tx, indent=4))

    key = primary.INRKey(pk)

    resp = inery.push_process(tx, key, broadcast=True)

    print("============ process LOGS ===============")
    print(json.dumps(resp, indent=4))

if __name__ == "__main__":
    yahaha()