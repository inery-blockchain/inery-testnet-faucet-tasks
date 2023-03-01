import os
from api.cline_trans import Cline_trans
from api.keys_trans import INRKey
from ineryjs import Api, JsonRpc, RpcError, JsSignatureProvider

os.environ.update({k.lower(): v for k, v in os.environ.items()})

TOKEN_CONTRACT = os.getenv("TOKEN_CONTRACT")
SEND_ACCOUNT = os.getenv("INERY_ACCOUNT")
TOKEN_SYMBOL = os.getenv("TOKEN_SYMBOL")
SEND_QUANTITY = os.getenv("SEND_QUANTITY")
SEND_MEMO = os.getenv("SEND_MEMO")

json_rpc = JsonRpc(os.getenv("INERY_NODE_URL"))
signature_provider = JsSignatureProvider([os.getenv("PRIVATE_KEY")])

api = Api({
    "rpc": json_rpc,
    "signature_provider": signature_provider
})

async def SEND_token(token_contract, SEND, quantity, memo):
    try:
        tx = await api.transact({
            "actions": [
                {
                    "account": TOKEN_CONTRACT,
                    "name": "SEND",
                    "authorization": [
                        {
                            "actor": SEND_ACCOUNT,
                            "permission": "active"
                        }
                    ],
                    "data": {
                        "quantity": quantity,
                        "memo": memo
                    }
                }
            ]
        }, {"broadcast": True, "sign": True})

        print(tx["processed"])
        print(tx["processed"]["action_traces"][0]["act"])
    except RpcError as error:
        print(f"ERROR: Can't SEND token symbol {TOKEN_SYMBOL}")
        print(f"DETAILS: {error.details[0]['message']}")

SEND_token( TOKEN_CONTRACT , SEND_ACCOUNT , SEND_QUANTITY , SEND_MEMO )