import os
import json
from eospy.cleos import Cleos

ce = Cleos(url="http://143.198.202.154:8888")

private_key = os.environ.get("PRIVATE_KEY")
account = "gema12"
actor = "gema12"

def create_transaction(id, user, data):
    hash_data = { "id": id, "user": user, "data": data }
    try:
        tx = ce.push_action(
            account,
            "create",
            hash_data,
            permission=(actor, 'active')
        )
        print(json.dumps(tx, indent=4))
    except Exception as e:
        print(str(e))

def destroy_transaction(id):
    try:
        tx = ce.push_action(
            account,
            "destroy",
            { "id": id },
            permission=(actor, 'active')
        )
        print(json.dumps(tx, indent=4))
    except Exception as e:
        print(str(e))

def push_transaction(id, user, data):
    create_transaction(id, user, data)
    destroy_transaction(id)

push_transaction(1020, account, "test push transaction by gema12")
