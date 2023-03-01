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
    apiEndpoint := "https://5.144.132.50:8888"

    actionData := IneryValueAction{Value: "Hello, Inery!"}
    data, err := json.Marshal(actionData)
    if err != nil {
        panic(err)
    }

    transaction := map[string]interface{}{
        "actions": []map[string]interface{}{
            {
                "account": "amirmp",
                "name": "set",
                "authorization": []map[string]interface{}{
                    {
                        "actor": "amirmp",
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

    resp, err := http.Post(apiEndpoint+"/v1/chain/push_transaction", "application/json", bytes.NewBuffer(jsonBody))
    if err != nil {
        panic(err)
    }
    defer resp.Body.Close()

    fmt.Println(resp.Status)
    fmt.Println(resp.Header)
}
