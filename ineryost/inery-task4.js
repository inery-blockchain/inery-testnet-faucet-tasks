import requests
import json

def serialize_transaction(action):
    transaction = {
        "actions": [action]
    }
    return json.dumps(transaction)

def push_transaction(transaction_data):
    url = "http://<blockchain-node>:<port>/v1/chain/push_transaction"
    response = requests.post(url, data=transaction_data)
    return response.json()

def main():
    action = {
        "account": "<your-account>",
        "name": "<action-name>",
        "authorization": [{
            "actor": "<your-account>",
            "permission": "active"
        }],
        "data": "<action-data>"
    }
    transaction_data = serialize_transaction(action)
    response = push_transaction(transaction_data)
    if "transaction_id" in response:
        print("Transaction pushed to blockchain with ID:", response["transaction_id"])
    else:
        print("Error pushing transaction:", response["error"]["what"])

if __name__ == "__main__":
    main()
