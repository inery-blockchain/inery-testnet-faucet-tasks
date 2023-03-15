import { Api, JsonRpc, JsSignatureProvider } from "ineryjs"
import fetch, { Request, RequestInit, Response } from "node-fetch"
import { TextDecoder, TextEncoder } from "text-encoding"
import * as dotenv from 'dotenv'

const config = readConfig()


console.log("Performing push transaction with the following config", prettyJson(config))
console.log()


const customizedFetch = (input: string | Request, init: RequestInit): Promise<Response> => {
  if (init.headers === undefined) {
    init.headers = {}
  }

  return fetch(input, init)
}

/**
 * Demonstrates how to push a transaction with API endpoint.
 *
 * Requierements:
 *  - Have an environment variable name SIGNING_PRIVATE_KEY containing the private key used to sign the trx
 *  - Have an environment variable name TRANSFER_FROM_ACCOUNT containing the account that will send token from
 *  - Have an environment variable name TRANSFER_TO_ACCOUNT containing the account that will receive token from 
 *  - Have an environment variable name TRANSFER_QUANTITY containing the token quantity with symbol 
 */

async function main() {
  const signatureProvider = new JsSignatureProvider([config.privateKey])
  const rpc = new JsonRpc(config.endpoint, { fetch: customizedFetch })
  const api = new Api({
    rpc,
    signatureProvider,
    textDecoder: new TextDecoder(),
    textEncoder: new TextEncoder()
  })

  const transferAction = {
    account: "inery.token",
    name: "transfer",
    authorization: [
      {
        actor: config.transferFrom,
        permission: "active"
      }
    ],
    data: {
      from: config.transferFrom,
      to: config.transferTo,
      quantity: config.transferQuantity,
      memo: "Test Transfer"
    }
  }

  console.log("Transfer action", prettyJson(transferAction))

  const startTime = new Date()
  const result = await api.transact(
    { actions: [transferAction] },
    {
      blocksBehind: 3,
      expireSeconds: 30
    }
  )
  const endTime = new Date()

  printResult(result, startTime, endTime)
}

function printResult(result: any, startTime: Date, endTime: Date) {
  console.log("Transaction push result", prettyJson(result))
  console.log()

}

function prettyJson(input: any): string {
  return JSON.stringify(input, null, 2)
}

function readConfig() {
  dotenv.config()
  
  const endpoint = process.env.NODE_URL || ""
  const transferQuantity = process.env.TRANSFER_QUANTITY || ""

  const privateKey = process.env.SIGNING_PRIVATE_KEY
  if (privateKey === undefined) {
    console.log(
      "You must have a 'SIGNING_PRIVATE_KEY' environment variable containing private used to sign."
    )
    process.exit(1)
  }

  const transferFrom = process.env.TRANSFER_FROM_ACCOUNT
  if (transferFrom === undefined) {
    console.log(
      "You must have a 'TRANSFER_FROM_ACCOUNT' environment variable containing account that is going to send token."
    )
    process.exit(1)
  }


  const transferTo = process.env.TRANSFER_TO_ACCOUNT
  if (transferTo === undefined) {
    console.log(
      "You must have a 'TRANSFER_TO_ACCOUNT' environment variable containing account that is going to receive token."
    )
    process.exit(1)
  }
    
  return {
    endpoint,
    privateKey: privateKey!,
    transferFrom: transferFrom!,
    transferTo: transferTo!,
    transferQuantity
  }
}

main()
  .then(() => {
    process.exit(0)
  })
  .catch((error) => {
    console.log("An error occurred.", prettyJson(error))
    process.exit(1)
  })
