import os
from inery.Api import Api
from inery.JsonRpc import JsonRpc
from inery.JsSignatureProvider import JsSignatureProvider

url = "http://85.239.232.206:8888"

json_rpc = JsonRpc(url)
private_key = os.getenv("PRIVATE_KEY")

account = "bgpateng"
actor = "bgpateng"
signature = JsSignatureProvider([private_key])

api = Api(rpc=json_rpc, signatureProvider=signature)

async def CreateTransaction(id, user, data):
    Hashdata = { id, user, data }
    try:
        tx = await api.transact(
            {
                "actions": [
                    {
                        "account": account,
                        "name": "create",
                        "authorization": [
                            {
                                "actor": actor,
                                "permission": "active"
                            }
                        ],
                        "data": {
                            **Hashdata
                        }
                    }
                ]
            },
            {"broadcast": True, "sign": True}
        )

        print(tx, "\n")
        print("\nResponse data:", tx.processed.action_traces[0].console)
    except Exception as err:
        print(err)

async def DestroyTrancsaction(id):
    try:
        destroyTx = await api.transact(
            {
                "actions": [
                    {
                        "account": account,
                        "name": "destroy",
                        "authorization": [
                            {
                                "actor": actor,
                                "permission": "active"
                            }
                        ],
                        "data": {
                            "id": id
                        }
                    }
                ]
            },
            {"broadcast": True, "sign": True}
        )

        print("Record destroyed ex bgpateng\n\n")
        print(destroyTx, "\n")
        print("responses: \n", destroyTx.processed.action_traces[0].console)
    except Exception as err:
        print(err)

async def PushTransaction(DataId, user, data):
    await CreateTransaction(DataId, user, data)
    await DestroyTrancsaction(DataId)

PushTransaction(1020, account, "tester push transaction ex bgpateng")
