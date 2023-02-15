import os
import json
import datetime as dt
import pytz
from dotenv import load_dotenv
from api.acline import Cline
from api import akeys
from api.autils import *

def agl(id):
    load_dotenv()

    inr = Cline()
    acc = os.environ["INERY_NAME"]
    pk = os.environ["INERY_PK"]
    a = { "id": id, "user": acc, "data": f"data {id}" }
    b = { "id": id}
    k = akeys.INRKey(pk)

    pyl = {"account": acc,"name": "create","authorization": [{"actor": acc,"permission": "active"}],"data": inr.abi_json_to_bin(acc, "create", a)["binargs"]}
    pyl2 = {"account": acc,"name": "destroy","authorization": [{"actor": acc,"permission": "active"}],"data": inr.abi_json_to_bin(acc, "destroy", b)["binargs"]}
    tx = {"actions": [pyl],"expiration": str((dt.datetime.utcnow() + dt.timedelta(seconds=60)).replace(tzinfo=pytz.UTC))}
    tx2 = {"actions": [pyl2],"expiration": str((dt.datetime.utcnow() + dt.timedelta(seconds=60)).replace(tzinfo=pytz.UTC))}

    r = inr.push_transaction(tx, k, broadcast=True)
    print(json.dumps(r, indent=4))

    r2 = inr.push_transaction(tx2, k, broadcast=True)
    print(json.dumps(r2, indent=4))

if __name__ == "__main__":
    agl(52465)
