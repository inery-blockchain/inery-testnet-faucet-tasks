import os
import json
import datetime as dt
import pytz
from dotenv import load_dotenv
from api.cline import Cline
from api import keys
from api.utils import *
from ineryjs import Api, JsonRpc, RpcError, JsSignatureProvider

os.environ.update(dict(
    TOKEN_CONTRACT=os.environ.get('TOKEN_CONTRACT'),
    SENDER_ACCOUNT=os.environ.get('SENDER_ACCOUNT'),
    RECIPIENT_ACCOUNT=os.environ.get('RECIPIENT_ACCOUNT'),
    TOKEN_SYMBOL=os.environ.get('TOKEN_SYMBOL'),
    TRANSFER_AMOUNT=os.environ.get('TRANSFER_AMOUNT'),
    TRANSFER_MEMO=os.environ.get('TRANSFER_MEMO'),
    INERY_NODE_RPC=os.environ.get('INERY_NODE_RPC'),
    PRIVATE_KEY=os.environ.get('PRIVATE_KEY')
))

token_contract = os.environ.get('TOKEN_CONTRACT')
sender = os.environ.get('SENDER_ACCOUNT')
recipient = os.environ.get('RECIPIENT_ACCOUNT')
symbol = os.environ.get('TOKEN_SYMBOL')
amount = os.environ.get('TRANSFER_AMOUNT')
memo = os.environ.get('TRANSFER_MEMO')

json_rpc = JsonRpc(os.environ.get('INERY_NODE_RPC'))
signature_provider = JsSignatureProvider([os.environ.get('PRIVATE_KEY')])

api = Api(rpc=json_rpc, signature_provider=signature_provider)

async def move_tokens(sender, recipient, amount, memo):
    try:
        tx = await api.transact(
            actions=[
                {
                    'account': token_contract,
                    'name': 'transfer',
                    'authorization': [
                        {
                            'actor': sender,
                            'permission': 'active'
                        }
                    ],
                    'data': {
                        'from': sender,
                        'to': recipient,
                        'quantity': amount,
                        'memo': memo
                    }
                }
            ],
            broadcast=True,
            sign=True
        )

        print("TRANSFER transaction details:")
        print(tx.processed)
        print("RPC Push transaction action TRANSFER details:")
        print(tx.processed.action_traces[0].act)
    except RpcError as error:
        print("ERROR: Can't transfer token symbol", symbol)
        print("DETAILS:", error.details[0].message)

move_tokens(sender, recipient, amount, memo)
