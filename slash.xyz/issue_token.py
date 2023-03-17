import os
import asyncio
from typing import Dict
from dotenv import load_dotenv
from ineryjs import Api, JsonRpc, RpcError, JsSignatureProvider

load_dotenv()

TOKEN_CONTRACT = os.getenv("TOKEN_CONTRACT")
ISSUER_ACCOUNT = os.getenv("ISSUER_ACCOUNT")
TOKEN_SYMBOL = os.getenv("TOKEN_SYMBOL")
ISSUE_QUANTITY = os.getenv("ISSUE_QUANTITY")
ISSUE_MEMO = os.getenv("ISSUE_MEMO")
PRIVATE_KEY = os.getenv("PRIVATE_KEY")
INERY_NODE_URL = os.getenv("INERY_NODE_URL")

def get_json_rpc(node_url: str) -> JsonRpc:
    return JsonRpc(node_url)

def get_signature_provider(private_key: str) -> JsSignatureProvider:
    return JsSignatureProvider([private_key])

async def issue_token(token_contract: str, issuer: str, quantity: str, memo: str, rpc: JsonRpc, signature_provider: JsSignatureProvider) -> None:
    api = Api(rpc=rpc, signature_provider=signature_provider)

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

        print("Transaction details:")
        print(tx.processed)
        print("RPC transaction details:")
        print(tx.processed.action_traces[0].act)
    except RpcError as e:
        print(f"ERROR: Can't issue token symbol {TOKEN_SYMBOL}")
        print("DETAILS:", e.details[0].message)

async def main(env_vars: Dict[str, str]) -> None:
    rpc = get_json_rpc(env_vars["INERY_NODE_URL"])
    signature_provider = get_signature_provider(env_vars["PRIVATE_KEY"])
    await issue_token(env_vars["TOKEN_CONTRACT"], env_vars["ISSUER_ACCOUNT"], env_vars["ISSUE_QUANTITY"], env_vars["ISSUE_MEMO"], rpc, signature_provider)

if __name__ == "__main__":
    env_vars = {
        "TOKEN_CONTRACT": TOKEN_CONTRACT,
        "ISSUER_ACCOUNT": ISSUER_ACCOUNT,
        "TOKEN_SYMBOL": TOKEN_SYMBOL,
        "ISSUE_QUANTITY": ISSUE_QUANTITY,
        "ISSUE_MEMO": ISSUE_MEMO,
        "PRIVATE_KEY": PRIVATE_KEY,
        "INERY_NODE_URL": INERY_NODE_URL
    }
    asyncio.run(main(env_vars))
