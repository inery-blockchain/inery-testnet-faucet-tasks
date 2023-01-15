import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'ineryjs/dist/index.js'
import * as dotenv from 'dotenv'
dotenv.config()

const url = "http://216.250.118.115:8888"
const json_rpc = new JsonRpc(url) 
const private_key = process.env.PRIVATE_KEY
const actor = process.env.INERY_ACCOUNT
const signature  = new JsSignatureProvider([private_key]);
const api = new Api({ rpc: json_rpc, signatureProvider: signature })

async function executeTransaction(contract, action, data, actor, permission) {
  try {
    const tx = await api.transact({
      actions: [
        {
          account: contract,
          name: action,
          authorization: [{ actor, permission }],
          data
        }
      ]
    }, { broadcast: true, sign: true })

    console.log("Transaction details:")
    console.log(tx, "\n")
    console.log("Response from contract:", tx.processed.action_traces[0].console)
    console.log("\n")
  } catch (error) {
    console.log(error)
  }
}

async function create(id, user, data) {
  await executeTransaction("denrais", "create", { id, user, data }, actor, "active")
}

async function destroy(id) {
  await executeTransaction("denrais", "destroy", { id }, actor, "active")
}

async function main(id, user, data) {
    await create(id, user, data)
    await destroy(id)
}

main(1, process.env.INERY_ACCOUNT, "CRUD Transaction via JSON RPC")
