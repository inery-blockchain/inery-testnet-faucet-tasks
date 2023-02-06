package main

import (
	"bytes"
	"encoding/json"
	"net/http"
)

const (
	nodeURL    = "http://node_url"
	privateKey = "PRIVATE_KEY"
	account    = "blackswan"
	actor      = "blackswan"
)

type action struct {
	Account     string            `json:"account"`
	Name        string            `json:"name"`
	Authorization []authorization `json:"authorization"`
	Data        interface{}      `json:"data"`
}

type authorization struct {
	Actor      string `json:"actor"`
	Permission string `json:"permission"`
}

type payload struct {
	Actions []action `json:"actions"`
}

func performTransaction(name string, data interface{}) {
	dataArray := []action{{
		Account: account,
		Name: name,
		Authorization: []authorization{{
			Actor:      actor,
			Permission: "active",
		}},
		Data: data,
	}}
	payload := payload{Actions: dataArray}
	payloadBytes, _ := json.Marshal(payload)

	http.Post(nodeURL, "application/json", bytes.NewBuffer(payloadBytes))
}

func createTransaction(id int, user string, data string) {
	dataMap := map[string]interface{}{"id": id, "user": user, "data": data}
	performTransaction("create", dataMap)
}

func readTransaction(id int) {
	dataMap := map[string]interface{}{"id": id}
	performTransaction("read", dataMap)
}

func destroyTransaction(id int) {
	dataMap := map[string]interface{}{"id": id}
	performTransaction("destroy", dataMap)
}

func pushTransaction(id int, user string, data string) {
	createTransaction(id, user, data)
	readTransaction(id)
	destroyTransaction(id)
}

func main() {
	pushTransaction(1, account, "This is RPC Push Transaction using Go")
}
