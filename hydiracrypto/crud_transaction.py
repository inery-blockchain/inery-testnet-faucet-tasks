import requests
import os

url = "http://node_url"
private_key = os.getenv("PRIVATE_KEY")
account = "hydiracrypto"
actor = "hydiracrypto"

def perform_transaction(name, data):
    global url, private_key, account, actor

    payload = {
        "actions": [
            {
                "account": account,
                "name": name,
                "authorization": [
                    {
                        "actor": actor,
                        "permission": "active"
                    }
                ],
                "data": data
            }
        ]
    }

    headers = {
        "Content-Type": "application/json",
    }

    response = requests.post(url, headers=headers, json=payload)

    return response.json()

def create_transaction(id, user, data):
    data = {"id": id, "user": user, "data": data}
    return perform_transaction("create", data)

def read_transaction(id):
    data = {"id": id}
    return perform_transaction("read", data)

def destroy_transaction(id):
    data = {"id": id}
    return perform_transaction("destroy", data)

def push_transaction(data_id, user, data):
    create_transaction(data_id, user, data)
    read_transaction(data_id)
    destroy_transaction(data_id)

push_transaction(1, account, "This is RPC Push Transaction using Python")
