import os
from api.cline import Cline
from api.keys import INRKey
from ineryjs import Api, JsonRpc, RpcError, JsSignatureProvider

os.environ.update({k.lower(): v for k, v in os.environ.items()})

TOKEN_CONTRACT = os.getenv("TOKEN_CONTRACT")
FROM_ACCOUNT = os.getenv("SENDER_ACCOUNT")
TO_ACCOUNT = os.getenv("RECIPIENT_ACCOUNT")
TOKEN_SYMBOL = os.getenv("TOKEN_SYMBOL")
AMOUNT = os.getenv("TRANSFER_AMOUNT")
MEMO = os.getenv("TRANSFER_MEMO")

json_rpc = JsonRpc(os.getenv("INERY_NODE_RPC"))
signature_provider = JsSignatureProvider([os.getenv("PRIVATE_KEY")])

api = Api({
    "rpc": json_rpc,
    "signature_provider": signature_provider
})

async def transfer_token(from_account, to_account, amount, memo):
    try:
        tx = await api.transact({
            "actions": [
                {
                    "account": TOKEN_CONTRACT,
                    "name": "transfer",
                    "authorization": [
                        {
                            "actor": from_account,
                            "permission": "active"
                        }
                    ],
                    "data": {
                        "from": from_account,
                        "to": to_account,
                        "quantity": amount,
                        "memo": memo
                    }
                }
            ]
        }, {"broadcast": True, "sign": True})

        print(tx["processed"])
        print(tx["processed"]["action_traces"][0]["act"])
    except RpcError as error:
        print(f"ERROR: Can't transfer token symbol {TOKEN_SYMBOL}")
        print(f"DETAILS: {error.details[0]['message']}")

transfer_token(FROM_ACCOUNT, TO_ACCOUNT, AMOUNT, MEMO)
