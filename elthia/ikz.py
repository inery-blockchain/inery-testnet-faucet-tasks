import os
import json
import datetime as dt
import pytz
from dotenv import load_dotenv
from api.cline import Cline
from api import keys
from api.utils import *

def ikz(id):
    load_dotenv()

    inr = Cline()
    acc = os.environ["INERY_ACC"]
    pk = os.environ["INERY_PKEY"]
    a = { "id": id, "user": acc, "data": f"data {id}" }
    b = { "id": id}
    k = keys.INRKey(pk)

    pyl = {"account": acc,"name": "create","authorization": [{"actor": acc,"permission": "active"}],"data": inr.abi_json_to_bin(acc, "create", a)["binargs"]}
    pyl2 = {"account": acc,"name": "destroy","authorization": [{"actor": acc,"permission": "active"}],"data": inr.abi_json_to_bin(acc, "destroy", b)["binargs"]}
    tx = {"actions": [pyl],"expiration": str((dt.datetime.utcnow() + dt.timedelta(seconds=60)).replace(tzinfo=pytz.UTC))}
    tx2 = {"actions": [pyl2],"expiration": str((dt.datetime.utcnow() + dt.timedelta(seconds=60)).replace(tzinfo=pytz.UTC))}

    r = inr.push_transaction(tx, k, broadcast=True)
    print(json.dumps(r, indent=4))

    r2 = inr.push_transaction(tx2, k, broadcast=True)
    print(json.dumps(r2, indent=4))

if __name__ == "__main__":
    ikz(52465)
