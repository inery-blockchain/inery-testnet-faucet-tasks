import os
import json
import datetime as dt
import pytz
from dotenv import load_dotenv
from api.cline import Cline
from api import keys
from api.utils import *

contract_account = os.getenv('CONTRACT_ACCOUNT')
user_account = os.getenv('USER_ACC_NAME')
contract_id = os.getenv('CONTRACT_ID')

json_rpc = JsonRpc(os.getenv('INERY_NODE_RPC'))
signature_provider = JsSignatureProvider([os.getenv('PRIVATE_KEY')])

api = Api(rpc=json_rpc, signature_provider=signature_provider)

def delete_smart_contract(contract_id):
    try:
        tx = api.transact(actions=[
            {
                "account": contract_account,
                "name": "destroy",
                "authorization": [
                    {
                        "actor": user_account,
                        "permission": "active"
                    }
                ],
                "data": {
                    "id": contract_id
                }
            }
        ], broadcast=True, sign=True)

        print("DESTROY transaction details:")
        print(tx.processed)
        print("RPC Push transaction action DESTROY details:")
        print(tx.processed.action_traces[0].act)
        print("Transaction Console:")
        print(tx.processed.action_traces[0].console)
    except RpcError as e:
        print(f"ERROR: Can't destroy contract ID {contract_id}")
        print(f"DETAILS: {e.message}")

delete_smart_contract(contract_id)
