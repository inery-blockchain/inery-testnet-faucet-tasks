import requests
import json

url = "http://143.198.202.154:8888/v1/chain/push_transaction"

private_key = "your_private_key_here"

headers = {
    'Content-Type': 'application/json'
}

def create_transaction(id, user, data):
    payload = {
        "compression": "none",
        "transaction": {
            "expiration": "2022-12-31T12:30:00",
            "ref_block_num": 0,
            "ref_block_prefix": 0,
            "actions": [{
                "account": "gema12",
                "name": "create",
                "authorization": [{
                    "actor": "gema",
                    "permission": "active"
                }],
                "data": {
                    "id": id,
                    "user": user,
                    "data": data
                }
            }]
        }
    }
    response = requests.post(url, headers=headers, json=payload)

    if response.status_code == 200:
        print(json.loads(response.content))
    else:
        print("Transaction failed")

def destroy_transaction(id):
    payload = {
        "compression": "none",
        "transaction": {
            "expiration": "2022-12-31T12:30:00",
            "ref_block_num": 0,
            "ref_block_prefix": 0,
            "actions": [{
                "account": "gema12",
                "name": "destroy",
                "authorization": [{
                    "actor": "gema12",
                    "permission": "active"
                }],
                "data": {
                    "id": id
                }
            }]
        }
    }
    response = requests.post(url, headers=headers, json=payload)

    if response.status_code == 200:
        print(json.loads(response.content))
    else:
        print("Transaction failed")

def push_transaction(id, user, data):
    create_transaction(id, user, data)
    destroy_transaction(id)

push_transaction(1020, "gema12", "push transaction task 4 by gema12")
