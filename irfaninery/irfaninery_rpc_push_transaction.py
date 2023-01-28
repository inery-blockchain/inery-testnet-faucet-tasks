import json
import requests

url = "vmi1065246.contaboserver.net"
private_key = getenv("5JtaJgnswF4JM6Tc42fwDvPx8myGSHJWBH6N9Pv9HiH6nry1MWY")
account = "irfaninery"
actor = "irfaninery"

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

    response = requests.post(url, headers=headers, data=json.dumps(payload))
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
   

push_transaction(1, account, "This is rpc push transaction using Python")
