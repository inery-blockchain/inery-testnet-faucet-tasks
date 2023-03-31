import os
import json
import datetime as dt
import pytz
from dotenv import load_dotenv
from api.cline import Cline
from api import keys
from api.utils import *
from urllib3.exceptions import InsecureRequestWarning
import warnings

warnings.filterwarnings("ignore", category=InsecureRequestWarning)


def node(id):
    load_dotenv()

    transact = Cline(url='urURL')
    in_account = os.environ["IN_ACCOUNT"]
    p_keys = os.environ["PRIV_KEY"]
    a = {"id": id, "user": in_account, "data": f"data {id}"}
    b = {"id": id}
    c = keys.INRKey(p_keys)

    cR = {
        "account": in_account,
        "name": "create",
        "authorization": [{"actor": in_account, "permission": "active"}],
        "data": transact.abi_json_to_bin(in_account, "create", a)["binargs"]
    }
    dR = {
        "account": in_account,
        "name": "destroy",
        "authorization": [{"actor": in_account, "permission": "active"}],
        "data": transact.abi_json_to_bin(in_account, "destroy", b)["binargs"]
    }
    transactionCr = {
        "actions": [cR],
        "expiration": str((dt.datetime.utcnow() + dt.timedelta(seconds=60)).replace(tzinfo=pytz.UTC))
    }
    transactionDr = {
        "actions": [dR],
        "expiration": str((dt.datetime.utcnow() + dt.timedelta(seconds=60)).replace(tzinfo=pytz.UTC))
    }

    getxC = transact.push_transaction(transactionCr, c, broadcast=True)
    print("_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_")
    print("_-_-_- Create Transaction _-_-_-_")
    print("_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_")
    print(json.dumps(getxC, indent=1))

    getxD = transact.push_transaction(transactionDr, c, broadcast=True)
    print("_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_")
    print("_-_-_- Destroy Transaction _-_-_-")
    print("_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_")
    print(json.dumps(getxD, indent=1))


if __name__ == "__main__":
    node(666)
