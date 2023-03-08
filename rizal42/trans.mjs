// Import libraries

import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'ineryjs'

import * as dotenv from 'dotenv'

// Load environment variables from .env file

dotenv.config()

// Set URL for JSON RPC endpoint

const rpcUrl = "http://:8888"

// Create a new instance of JsonRpc with the URL

const jsonRpc = new JsonRpc(rpcUrl)

// Load private key from environment variables

const privateKey = process.env.PRIV_KEYS

// Load actor name from environment variables

const actor = process.env.INERY_NAME

// Set the account to be used for transactions

const account = actor

// Create a new instance of JsSignatureProvider with the private key

const signatureProvider = new JsSignatureProvider([privateKey])

// Create a new instance of Api with the JsonRpc and JsSignatureProvider instances

const api = new Api({

  rpc: jsonRpc,

  signatureProvider: signatureProvider

})

// Create a new transaction to add data to the blockchain

async function create(id, user, data) {

  try {

    const tx = await api.transact({

      actions: [

        {

          account,

          name: "create",

          authorization: [

            {

              actor,

              permission: "active"

            }

          ],

          data: {

            id,

            user,

            data

          }

        }

      ]

    },

    {

      broadcast: true,

      sign: true

    })

    console.log("=======================================================================")

    console.log("=================== CREATE transaction information ====================")

    console.log("=======================================================================")

    console.log(tx, "\n")

    console.log("Response from contract :", tx.processed.action_traces[0].console)

    console.log("\n")

  } catch (error) {

    console.log(error)

  }

}

// Create a new transaction to delete data from the blockchain

async function destroy(id) {

  try {

    const tx = await api.transact({

      actions: [

        {

          account,

          name: "destroy",

          authorization: [

            {

              actor,

              permission: "active"

            }

          ],

          data: {

            id

          }

        }

      ]

    },

    {

      broadcast: true,

      sign: true

    })

    console.log("=======================================================================")

    console.log("================== DESTROY transaction information ====================")

    console.log("=======================================================================")

    console.log(tx, "\n")

    console.log("Response from contract :", tx.processed.action_traces[0].console)

    console.log("\n")

  } catch (error) {

    console.log(error)

  }

}

// Run the main program

async function main(id, user, data) {

  await create(id, user, data)

  await destroy(id)

}

// Call the main function with sample data

main(1, account, "INERY TESTNET TASK4 by RIZAL42")

