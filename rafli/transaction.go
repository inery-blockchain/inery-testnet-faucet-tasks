package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "net/http"
    "os"
)

var (
    url = "http://node_url"
    privateKey = os.Getenv("PRIVATE_KEY")
    account = "rafli"
    actor = "rafli"
)

type Payload struct {
    Actions []Action `json:"actions"`
}

type Action struct {
    Account       string          `json:"account"`
    Name          string          `json:"name"`
    Authorization []Authorization `json:"authorization"`
    Data          interface{}     `json:"data"`
}

type Authorization struct {
    Actor      string `json:"actor"`
    Permission string `json:"permission"`
}

func performTransaction(name string, data interface{}) (interface{}, error) {
    payload := Payload{
        Actions: []Action{
            {
                Account: account,
                Name:    name,
                Authorization: []Authorization{
                    {
                        Actor:      actor,
                        Permission: "active",
                    },
                },
                Data: data,
            },
        },
    }

    payloadJSON, err := json.Marshal(payload)
    if err != nil {
        return nil, err
    }

    resp, err := http.Post(url, "application/json", bytes.NewReader(payloadJSON))
    if err != nil {
        return nil, err
    }

    var responseJSON interface{}
    err = json.NewDecoder(resp.Body).Decode(&responseJSON)
    if err != nil {
        return nil, err
    }

    return responseJSON, nil
}

func createTransaction(id int, user string, data string) (interface{}, error) {
    dataMap := map[string]interface{}{
        "id":   id,
        "user": user,
        "data": data,
    }
    return performTransaction("create", dataMap)
}

func readTransaction(id int) (interface{}, error) {
    dataMap := map[string]interface{}{
        "id": id,
    }
    return performTransaction("read", dataMap)
}

func destroyTransaction(id int) (interface{}, error) {
    dataMap := map[string]interface{}{
        "id": id,
    }
    return performTransaction("destroy", dataMap)
}

func pushTransaction(dataID int, user string, data string) error {
    _, err := createTransaction(dataID, user, data)
    if err != nil {
        return err
    }
    _, err = readTransaction(dataID)
    if err != nil {
        return err
    }
    _, err = destroyTransaction(dataID)
    if err != nil {
        return err
    }
    return nil
}

func main() {
    err := pushTransaction(1, account, "This is RPC Push Transaction using Golang")
    if err != nil {
        fmt.Println(err)
    }
}
