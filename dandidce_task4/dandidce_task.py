import json
import os
import requests

url = "http://node_url"
private_key = os.environ.get("PRIVATE_KEY")
account = "dandidce"
actor = "dandidce"

def perform_transaction(name, data):
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

    response = requests.post(url, data=json.dumps(payload), headers=headers)
    return json.loads(response.text)

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
