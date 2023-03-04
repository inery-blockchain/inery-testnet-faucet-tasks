import os
import pytz
from dotenv import load_dotenv
from ineryjs import Api, JsonRpc, RpcError, JsSignatureProvider

load_dotenv()

def get_environment_variable(name: str) -> str:
    return os.environ.get(name)

TOKEN_CONTRACT = get_environment_variable("TOKEN_CONTRACT")
ISSUER_ACCOUNT = get_environment_variable("ISSUER_ACCOUNT")
TOKEN_SYMBOL = get_environment_variable("TOKEN_SYMBOL")
ISSUE_QUANTITY = get_environment_variable("ISSUE_QUANTITY")
ISSUE_MEMO = get_environment_variable("ISSUE_MEMO")

def get_json_rpc() -> JsonRpc:
    return JsonRpc(get_environment_variable("INERY_NODE_URL"))

def get_signature_provider() -> JsSignatureProvider:
    return JsSignatureProvider([get_environment_variable("PRIVATE_KEY")])

async def issue_token(token_contract: str, issuer: str, quantity: str, memo: str) -> None:
    json_rpc = get_json_rpc()
    signature_provider = get_signature_provider()
    api = Api(rpc=json_rpc, signature_provider=signature_provider)

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

async def main() -> None:
    await issue_token(TOKEN_CONTRACT, ISSUER_ACCOUNT, ISSUE_QUANTITY, ISSUE_MEMO)

if __name__ == "__main__":
    asyncio.run(main())
