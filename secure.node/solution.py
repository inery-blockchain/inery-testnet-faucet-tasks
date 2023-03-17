import os
import json
import datetime as dt
import pytz
from dotenv import load_dotenv
from api.cline_api import Cline
from api import keys_api
from api.utils_api import *
from urllib3.exceptions import InsecureRequestWarning
import warnings
warnings.filterwarnings("ignore", category=InsecureRequestWarning)


def transact(id):
    load_dotenv()

    api = Cline()
    in_acccount = os.environ["INERY"]
    P_keys = os.environ["KEY"]
    x = { "id": id, "user": in_acccount, "data": f"data {id}" }
    y = { "id": id}
    z = keys_api.INRKey(P_keys)


    actx = {"account": in_acccount,"name": "create","authorization": [{"actor": in_acccount,"permission": "active"}],"data": api.abi_json_to_bin(in_acccount, "create", x)["binargs"]}
    actz = {"account": in_acccount,"name": "destroy","authorization": [{"actor": in_acccount,"permission": "active"}],"data": api.abi_json_to_bin(in_acccount, "destroy", y)["binargs"]}
    transactionx = {"actions": [actx],"expiration": str((dt.datetime.utcnow() + dt.timedelta(seconds=60)).replace(tzinfo=pytz.UTC))}
    transactionz = {"actions": [actz],"expiration": str((dt.datetime.utcnow() + dt.timedelta(seconds=60)).replace(tzinfo=pytz.UTC))}

    getx = api.api_transaction(transactionx, z, broadcast=True)
    print("Create Transaction")
    print(json.dumps(getx, indent=1))

    getz = api.api_transaction(transactionz, z, broadcast=True)
    print("Destroy Transaction")
    print(json.dumps(getz, indent=1))

if __name__ == "__main__":
     transact(265)
