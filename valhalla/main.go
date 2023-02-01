package main

import (
	"github.com/inery-blockchain/ineryjs"
	"log"
)

func main() {
	// setup JSON RPC
	jsonRpc := ineryjs.NewJsonRpc("http://localhost:8888")

	// setup private key
	privateKey := "your_private_key"
	signatureProvider := ineryjs.NewJsSignatureProvider([]string{privateKey})

	// setup API
	api := ineryjs.NewApi(map[string]interface{}{
		"rpc": jsonRpc,
		"signatureProvider": signatureProvider,
	})

	// the account and actor
	account := "your_account_name"
	actor := "your_actor_name"

	// data for the function call
	data := map[string]interface{}{
		"id":    1,
		"user":  actor,
		"value": "Data from ineryjs",
	}

	// make the function call
	result, err := api.Transact(map[string]interface{}{
		"actions": []map[string]interface{}{
			{
				"account": account,
				"name":    "create",
				"authorization": []map[string]interface{}{
					{
						"actor":      actor,
						"permission": "active",
					},
				},
				"data": data,
			},
		},
	}, map[string]interface{}{
		"broadcast": true,
		"sign":      true,
	})

	if err != nil {
		log.Fatalf("Failed to create data: %s", err)
	}

	log.Printf("Transaction: %+v", result)
}
