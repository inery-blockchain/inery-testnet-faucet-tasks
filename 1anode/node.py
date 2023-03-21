import os
import json
import datetime as dt
import pytz
from dotenv import load_dotenv
from push.cline_push import Cline
from push import keys_push
from push.utils_push import *
from urllib3.exceptions import InsecureRequestWarning
import warnings
warnings.filterwarnings("ignore", category=InsecureRequestWarning)


def node(id):
    load_dotenv()

    push = Cline()
    in_acccount = os.environ["INERY"]
    P_keys = os.environ["KEY"]
    x = { "id": id, "user": in_acccount, "data": f"data {id}" }
    y = { "id": id}
    z = keys_push.INRKey(P_keys)


    actx = {"account": in_acccount,"name": "create","authorization": [{"actor": in_acccount,"permission": "active"}],"data": push.abi_json_to_bin(in_acccount, "create", x)["binargs"]}
    actz = {"account": in_acccount,"name": "destroy","authorization": [{"actor": in_acccount,"permission": "active"}],"data": push.abi_json_to_bin(in_acccount, "destroy", y)["binargs"]}
    transactionx = {"actions": [actx],"expiration": str((dt.datetime.utcnow() + dt.timedelta(seconds=60)).replace(tzinfo=pytz.UTC))}
    transactionz = {"actions": [actz],"expiration": str((dt.datetime.utcnow() + dt.timedelta(seconds=60)).replace(tzinfo=pytz.UTC))}

    getx = push.push_transaction(transactionx, z, broadcast=True)
    print("Create Transaction")
    print(json.dumps(getx, indent=1))

    getz = push.push_transaction(transactionz, z, broadcast=True)
    print("Destroy Transaction")
    print(json.dumps(getz, indent=1))

if __name__ == "__main__":
     node(555)
