import os
from api.cline_trans import Cline_trans
from api.keys_trans import INRKey
from ineryjs import Api, JsonRpc, RpcError, JsSignatureProvider

os.environ.update({k.lower(): v for k, v in os.environ.items()})

TOKEN_CONTRACT = os.getenv("TOKEN_CONTRACT")
TRANSFER_ACCOUNT = os.getenv("INERY_ACCOUNT")
TOKEN_SYMBOL = os.getenv("TOKEN_SYMBOL")
TRANSFER_QUANTITY = os.getenv("TRANSFER_QUANTITY")
TRANSFER_MEMO = os.getenv("TRANSFER_MEMO")

json_rpc = JsonRpc(os.getenv("INERY_NODE_URL"))
signature_provider = JsSignatureProvider([os.getenv("PRIVATE_KEY")])

api = Api({
    "rpc": json_rpc,
    "signature_provider": signature_provider
})

async def TRANSFER_token(token_contract, transfer, quantity, memo):
    try:
        tx = await api.transact({
            "actions": [
                {
                    "account": TOKEN_CONTRACT,
                    "name": "TRANSFER",
                    "authorization": [
                        {
                            "actor": TRANSFER_ACCOUNT,
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
        print(f"ERROR: Can't TRANSFER token symbol {TOKEN_SYMBOL}")
        print(f"DETAILS: {error.details[0]['message']}")

TRANSFER_token( TOKEN_CONTRACT , TRANSFER_ACCOUNT , TRANSFER_QUANTITY , TRANSFER_MEMO )