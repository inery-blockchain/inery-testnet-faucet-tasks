In this solution, we use the net/http package to send a POST request to the Inery Blockchain API endpoint. We first specify the API endpoint URL, and then create a JSON object for the action data using the IneryValueAction struct. We then use the json.Marshal function to convert the action data into a JSON string.

Next, we create a JSON object for the transaction by specifying the account name, action name, authorization details, and the action data. We use the json.Marshal function again to convert the transaction object into a JSON string.

Finally, we send a POST request to the Inery Blockchain API endpoint with the JSON-encoded transaction in the request body. The API endpoint will receive the request, validate the transaction, and if successful, add it to the blockchain.
