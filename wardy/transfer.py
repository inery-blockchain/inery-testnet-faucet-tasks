import os
from api.cline_trans import Cline_trans
from api.keys_trans import INRKey
from ineryjs import Api, JsonRpc, RpcError, JsSignatureProvider

os.environ.update({k.lower(): v for k, v in os.environ.items()})

TOKEN_CONTRACT = os.getenv("TOKEN_CONTRACT")
FROM_ACCOUNT = os.getenv("MAILER_ACCOUNT")
FOR_ACCOUNT = os.getenv("RECIVER_ACCOUNT")
TOKEN_SYMBOL = os.getenv("TOKEN_SYMBOL")
QUANTITY = os.getenv("TRANSFER_QUANTITY")
MEMO = os.getenv("MEMO")

json_rpc = JsonRpc(os.getenv("NODE_ADDRESS"))
signature_provider = JsSignatureProvider([os.getenv("PRIVATE_KEY")])

api = Api({
    "rpc": json_rpc,
    "signature_provider": signature_provider
})

async def transfer(from_account, for_account, quantity, memo):
    try:
        tx = await api.transact({
            "actions": [
                {
                    "account": TOKEN_CONTRACT,
                    "name": "transfer",
                    "authorization": [
                        {
                            "actor": wardy,
                            "permission": "active"
                        }
                    ],
                    "data": {
                        "from": wardy,
                        "for": inery,
                        "quantity": 10,
                        "memo": Here 10 WRY for you brother
                    }
                }
            ]
        }, {"broadcast": True, "sign": True})

        print(tx["processed"])
        print(tx["processed"]["action_traces"][0]["act"])
    except RpcError as error:
        print(f"ERROR: Can't transfer token symbol {WRY}")
        print(f"DETAILS: {error.details[0]['message']}")

transfer(wardy, inery, 10, Here 10 WRY for you brother)