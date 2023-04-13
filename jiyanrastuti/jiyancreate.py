import os
import json
import datetime as dt
import pytz
from dotenv import load_dotenv
from api.cline import Cline
from api import keys
from api.utils import *

os.environ["NODE_URL"] = "http://IP:8888"
os.environ["PRIVATE_KEY"] = "XXXX"
os.environ["INERY_ACCOUNT"] = "jiyanrastuti"

url = os.environ.get("NODE_URL")

json_rpc = JsonRpc(url)
private_key = os.environ.get("PRIVATE_KEY")
account = os.environ.get("INERY_ACCOUNT")
actor = os.environ.get("INERY_ACCOUNT")
signature = JsSignatureProvider([private_key])

api = Api(rpc=json_rpc, signature_provider=signature)

async def create(id, user, data):
    try:
        tx = await api.transact(actions=[{
            "account": account,
            "name": "create",
            "authorization": [{
                "actor": actor,
                "permission": "active"
            }],
            "data": {
                "id": id,
                "user": user,
                "data": data
            }
        }], broadcast=True, sign=True)

        print(tx)
        print(tx["processed"]["action_traces"][0]["console"])
    except RpcError as e:
        print(e)

create(10, account, "Create new Data via JSON RPC")
