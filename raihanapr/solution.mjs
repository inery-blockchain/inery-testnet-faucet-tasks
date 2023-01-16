import jsonrpcclient.exceptions
from jsonrpcclient.clients.http_client import HTTPClient

url = "vmi1012580.contaboserver.net"
private_key = "5KLBth5JvzAv8NFFukUPXYp9mEQYdv1VrTNELNp5aMb6Kd3AFQYomFxGu"
actor = "raihanapr"
account = "raihanapr"

rpc = HTTPClient(url)

def create(id, user, data):
    try:
        tx = rpc.send(
            "push_transaction", 
            [{
                "signatures": [private_key],
                "compression": 0,
                "packed_context_free_data": "",
                "packed_trx": f"{'0e0a7261696168616e6170720a1500000000000000ea3055000000000000'} {'00000000a8ed3232320a0000000000000004454f530000000000'} {hex(int(id))[2:].zfill(8)} {user.encode().hex()} {data.encode().hex()}"
            }]
        )
        print("Transaction success: ", tx)
    except jsonrpcclient.exceptions.ReceivedErrorResponseError as e:
        print("Error: ", e.message)

def read(id):
    try:
        tx = rpc.send(
            "push_transaction",
            [{
                "signatures": [private_key],
                "compression": 0,
                "packed_context_free_data": "",
                "packed_trx": f"{'0e0a7261696168616e6170720a1500000000000000ea3055000000000000'} {'00000000a8ed3232320a0000000000000004454f530000000000'} {hex(int(id))[2:].zfill(8)}"
            }]
        )
        print("Transaction success: ", tx)
    except jsonrpcclient.exceptions.ReceivedErrorResponseError as e:
        print("Error: ", e.message)

def update(id, data):
    try:
        tx = rpc.send(
            "push_transaction",
            [{
                "signatures": [private_key],
                "compression": 0,
                "packed_context_free_data": "",
                "packed_trx": f"{'0e0a7261696168616e6170720a1500000000000000ea3055000000000000'} {'00000000a8ed3232320a0000000000000004454f530000000000'} {hex(int(id))[2:].zfill(8)} {data.encode().hex()}"
            }]
        )
        print("Transaction success: ", tx)
    except jsonrpcclient.exceptions.ReceivedErrorResponseError as e:
        print("Error: ", e.message)

def destroy(id):
    try:
        tx = rpc.send(
            "push_transaction",
            [{
                "signatures": [private_key],
"compression": 0,
"packed_context_free_data": "",
"packed_trx": f"{'0e0a7261696168616e6170720a1500000000000000ea3055000000000000'} {'00000000a8ed3232320a0000000000000004454f530000000000'} {hex(int(id))[2:].zfill(8)}"
}]
)
print("Transaction success: ", tx)
except jsonrpcclient.exceptions.ReceivedErrorResponseError as e:
print("Error: ", e.message)
