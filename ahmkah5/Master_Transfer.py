import os
import sys
from pyeoskit import rpc, wallet, api

url = "http://185.182.185.16:8888"

def create_transaction(id, user, data):
    try:
        hash_data = {
            "id": id,
            "user": user,
            "data": data
        }
        tx = api.transact(
            {
                "actions": [
                    {
                        "account": "ahmkah5",
                        "name": "create",
                        "authorization": [
                            {
                                "actor": "ahmkah5",
                                "permission": "active"
                            }
                        ],
                        "data": hash_data
                    }
                ]
            },
            url,
            os.getenv("PRIVATE_KEY")
        )
        print(tx)
    except Exception as e:
        print(e)

def read_transaction(id):
    try:
        read_id = api.transact(
            {
                "actions": [
                    {
                        "account": "ahmkah5",
                        "name": "read",
                        "authorization": [
                            {
                                "actor": "ahmkah5",
                                "permission": "active"
                            }
                        ],
                        "data": {
                            "id": id
                        }
                    }
                ]
            },
            url,
            os.getenv("PRIVATE_KEY")
        )
        print("Read Record\n\n")
        print(read_id)
    except Exception as e:
        print(e)

def destroy_transaction(id):
    try:
        destroy_tx = api.transact(
            {
                "actions": [
                    {
                        "account": "ahmkah5",
                        "name": "destroy",
                        "authorization": [
                            {
                                "actor": "ahmkah5",
                                "permission": "active"
                            }
                        ],
                        "data": {
                            "id": id
                        }
                    }
                ]
            },
            url,
            os.getenv("PRIVATE_KEY")
        )
        print("Destroy Record\n\n")
        print(destroy_tx)
    except Exception as e:
        print(e)

def push_transaction(DataId, user, data):
    create_transaction(DataId, user, data)
    read_transaction(DataId)
    destroy_transaction(DataId)

push_transaction(1050, "ahmkah5", "RPC Push Transaction")
