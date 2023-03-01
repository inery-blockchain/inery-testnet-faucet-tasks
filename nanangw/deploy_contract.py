import os
from ineryjs import Api, JsonRpc, JsSignatureProvider, ecc
from api.keys_trans import INRKey

os.environ.update({k.lower(): v for k, v in os.environ.items()})

TOKEN_CONTRACT = os.getenv("TOKEN_CONTRACT")
DEPLOY_CONTRACT_ACCOUNT = os.getenv("INERY_ACCOUNT")
TOKEN_SYMBOL = os.getenv("TOKEN_SYMBOL")
DEPLOY_CONTRACT_QUANTITY = os.getenv("DEPLOY_CONTRACT_QUANTITY")
DEPLOY_CONTRACT_MEMO = os.getenv("_DEPLOY_CONTRACT_MEMO")
PRIVATE_KEY = os.getenv("PRIVATE_KEY")

# Inisialisasi JSON-RPC
json_rpc = JsonRpc(os.getenv("INERY_NODE_URL"))

# Inisialisasi Signature Provider
signature_provider = JsSignatureProvider([PRIVATE_KEY])

# Inisialisasi API
api = Api({
    "rpc": json_rpc,
    "signature_provider": signature_provider
})

# Fungsi untuk deploy kontrak token
async def deploy_contract_token(token_contract, deploy_contract, quantity, memo):
    try:
        # Transaksi untuk deploy kontrak token
        tx = await api.transact({
            "actions": [
                {
                    "account": token_contract,
                    "name": "create",
                    "authorization": [
                        {
                            "actor": deploy_contract,
                            "permission": "active"
                        }
                    ],
                    "data": {
                        "issuer": deploy_contract,
                        "maximum_supply": f"{quantity} {TOKEN_SYMBOL}"
                    }
                }
            ]
        }, {"broadcast": True, "sign": True})

        print(tx["processed"])
        print(tx["processed"]["action_traces"][0]["act"])
    except Exception as error:
        print(f"ERROR: Can't deploy contract token symbol {TOKEN_SYMBOL}")
        print(f"DETAILS: {error}")

# Panggil fungsi untuk deploy kontrak token
deploy_contract_token(TOKEN_CONTRACT, DEPLOY_CONTRACT_ACCOUNT, DEPLOY_CONTRACT_QUANTITY, DEPLOY_CONTRACT_MEMO