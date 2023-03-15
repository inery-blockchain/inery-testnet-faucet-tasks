import os
from ineryjs import Api, JsonRpc, JsSignatureProvider
from dotenv import load_dotenv

load_dotenv()

rpc = JsonRpc(os.getenv('NODE_URL'))
signatureProvider = JsSignatureProvider([os.getenv('PRIV_KEY')])
api = Api({'rpc': rpc, 'signatureProvider': signatureProvider})
account = os.getenv('ACCOUNT')
id = 1000
data = 'INERY JSON-RPC CRUD push transaction'

await api.get_abi(account, True)

async def create_data():
    try:
        result = await api.transact({
            'actions': [api.with_(account).as_(account).create(id, account, data)]
        })
        print(result['processed']['action_traces'][0]['act']['name'])
        print(result['processed']['action_traces'][0]['console'])
        print(result['processed']['action_traces'][0])
    except Exception as error:
        print(error)

async def read_data():
    try:
        result = await api.transact({
            'actions': [api.with_(account).as_(account).read(id)]
        })
        print(result['processed']['action_traces'][0]['act']['name'])
        print(result['processed']['action_traces'][0]['console'])
        print(result['processed']['action_traces'][0])
    except Exception as error:
        print(error)

async def update_data():
    try:
        result = await api.transact({
            'actions': [api.with_(account).as_(account).update(id, data)]
        })
        print(result['processed']['action_traces'][0]['act']['name'])
        print(result['processed']['action_traces'][0]['console'])
        print(result['processed']['action_traces'][0])
    except Exception as error:
        print(error)

async def delete_data():
    try:
        result = await api.transact({
            'actions': [api.with_(account).as_(account).destroy(id)]
        })
        print(result['processed']['action_traces'][0]['act']['name'])
        print(result['processed']['action_traces'][0]['console'])
        print(result['processed']['action_traces'][0])
    except Exception as error:
        print(error)

