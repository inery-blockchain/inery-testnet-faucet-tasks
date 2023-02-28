import requests
import json

def push_transaction(private_key, endpoint, contract, action, data):
    # Define the API endpoint for pushing transactions
    api_endpoint = endpoint + '/v1/chain/push_transaction'
    
    # Define the required headers for the API request
    headers = {
        'Content-Type': 'application/json'
    }

    # Define the JSON data for the transaction
    transaction = {
        "actions": [{
            "account": contract,
            "name": action,
            "authorization": [{
                "actor": "your_account_name",
                "permission": "active"
            }],
            "data": json.dumps(data)
        }]
    }

    # Sign the transaction using the private key
    # ... (signature code goes here)

    # Make the API request to push the transaction
    response = requests.post(api_endpoint, headers=headers, json=transaction)

    # Return the API response
    return response