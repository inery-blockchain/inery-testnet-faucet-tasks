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

    transact = Cline(url='')
    inery_account = os.environ["INERY_ACCOUNT"]
    p_keys = os.environ["PRIVATE_KEY"]
    x = {"id": id, "user": inery_account, "data": f"data {id}"}
    y = {"id": id}
    z = keys.INRKey(p_keys)

    bC = {
        "account": inery_account,
        "name": "create",
        "authorization": [{"actor": inery_account, "permission": "active"}],
        "data": transact.abi_json_to_bin(inery_account, "create", x)["binargs"]
    }
    bR = {
        "account": inery_account,
        "name": "read",
        "authorization": [{"actor": inery_account, "permission": "active"}],
        "data": transact.abi_json_to_bin(inery_account, "read", y)["binargs"]
    }
    transactionC = {
        "actions": [bC],
        "expiration": str((dt.datetime.utcnow() + dt.timedelta(seconds=60)).replace(tzinfo=pytz.UTC))
    }
    transactionR = {
        "actions": [bR],
        "expiration": str((dt.datetime.utcnow() + dt.timedelta(seconds=60)).replace(tzinfo=pytz.UTC))
    }

    getxC = transact.push_transaction(transactionC, z, broadcast=True)
    print("IIIIIIIIIIIIIIIIIIIIIIIIIIII")
    print("IIII Create Transaction IIII")
    print("IIIIIIIIIIIIIIIIIIIIIIIIIIII")
    print(json.dumps(getxC, indent=1))

    getxR = transact.push_transaction(transactionR, z, broadcast=True)
    print("IIIIIIIIIIIIIIIIIIIIIIIIIIII")
    print("IIIII Read Transaction IIIII")
    print("IIIIIIIIIIIIIIIIIIIIIIIIIIII")
    print(json.dumps(getxR, indent=1))


if __name__ == "__main__":
    node(1)
