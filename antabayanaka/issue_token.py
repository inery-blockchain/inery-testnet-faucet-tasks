import os
import json
import pytz
from dotenv import load_dotenv
from api.cline import Cline
from api import keys
from ineryjs import Api, JsonRpc, RpcError, JsSignatureProvider

load_dotenv()

TOKEN_CONTRACT = os.environ.get("TOKEN_CONTRACT")
ISSUER_ACCOUNT = os.environ.get("ISSUER_ACCOUNT")
TOKEN_SYMBOL = os.environ.get("TOKEN_SYMBOL")
ISSUE_QUANTITY = os.environ.get("ISSUE_QUANTITY")
ISSUE_MEMO = os.environ.get("ISSUE_MEMO")

json_rpc = JsonRpc(os.environ.get("INERY_NODE_URL"))
signature_provider = JsSignatureProvider([os.environ.get("PRIVATE_KEY")])

api = Api(rpc=json_rpc, signature_provider=signature_provider)

async def issue_token(token_contract:str, issuer:str, quantity:str, memo:str):
    try:
        tx = await api.transact({
            "actions": [
                {
                    "account": token_contract,
                    "name": "issue",
                    "authorization": [
                        {
                            "actor": issuer,
                            "permission": "active"
                        }
                    ],
                    "data": {
                        "to": issuer,
                        "quantity": quantity,
                        "memo": memo
                    }
                }
            ]
        }, broadcast=True, sign=True)

        print("transaction details:")
        print(tx.processed)
        print("RPC transaction details:")
        print(tx.processed.action_traces[0].act)
    except RpcError as e:
        print("ERROR: Can't issue token symbol", TOKEN_SYMBOL)
        print("DETAILS:", e.details[0].message)

issue_token(TOKEN_CONTRACT, ISSUER_ACCOUNT, ISSUE_QUANTITY, ISSUE_MEMO)
