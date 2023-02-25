package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "net/http"
)

type IneryValueAction struct {
    Value string json:"value"
}

func main() {
    // Specify the URL of the Inery Blockchain API endpoint
    apiEndpoint := "https://api.inery.io"

    // Create a JSON object for the action data
    actionData := IneryValueAction{Value: "Hello, Inery!"}
    data, err := json.Marshal(actionData)
    if err != nil {
        panic(err)
    }

    // Create a JSON object for the transaction
    transaction := map[string]interface{}{
        "actions": []map[string]interface{}{
            {
                "account": "inery.value",
                "name": "set",
                "authorization": []map[string]interface{}{
                    {
                        "actor": "your_account_name",
                        "permission": "active",
                    },
                },
                "data": map[string]interface{}{
                    "value": string(data),
                },
            },
        },
    }
    jsonBody, err := json.Marshal(transaction)
    if err != nil {
        panic(err)
    }

    // Send a POST request to the Inery Blockchain API to push the transaction
    resp, err := http.Post(apiEndpoint+"/v1/chain/push_transaction", "application/json", bytes.NewBuffer(jsonBody))
    if err != nil {
        panic(err)
    }
    defer resp.Body.Close()

    // Print the response from the Inery Blockchain API
    fmt.Println(resp.Status)
    fmt.Println(resp.Header)
}