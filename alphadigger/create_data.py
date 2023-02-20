import os
import json
from dotenv import load_dotenv
from api_client.cline import Cline
from api_client import keys
from api_client.utils import *

os.environ["NODE_URL"] = "http://00.000.00.000:8888"
os.environ["PRIVATE_KEY"] = "xxxxx"
os.environ["INERY_ACCOUNT"] = "alphadigger"

rpc_url = os.environ.get("NODE_URL")

json_rpc = JsonRpc(rpc_url)
private_key = os.environ.get("PRIVATE_KEY")
account_name = os.environ.get("INERY_ACCOUNT")
actor_name = os.environ.get("INERY_ACCOUNT")
signature = JsSignatureProvider([private_key])

api_client = ApiClient(rpc=json_rpc, signature_provider=signature)

async def create_data(id, user, data):
    try:
        transaction = await api_client.transact(actions=[{
            "account": account_name,
            "name": "create",
            "authorization": [{
                "actor": actor_name,
                "permission": "active"
            }],
            "data": {
                "id": id,
                "user": user,
                "data": data
            }
        }], broadcast=True, sign=True)

        print(transaction)
        print(transaction["processed"]["action_traces"][0]["console"])
    except RpcError as e:
        print(e)

create_data(10, account_name, "Create new Data")
