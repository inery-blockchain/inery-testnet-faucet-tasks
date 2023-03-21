import { Api, JsonRpc, RpcError, JsSignatureProvider } from '../dist/index.js'
import * as dotenv from 'dotenv'
dotenv.config()

const server = process.env.server_name
const provide = new JsonRpc(server) 
const New_key = process.env.key_private
const actor = process.env.name_account
const validation  = new JsSignatureProvider([New_key]);
const get = new Api({ rpc: provide, signatureProvider: validation })

async function push(contract, action, data, actor, permission) {
  try {
    const tx = await get.transact({
      actions: [
        {
          account: contract,
          name: action,
          authorization: [{ actor, permission }],
          data
        }
      ]
    }, { broadcast: true, sign: true })
    console.log(tx, "\n")
    console.log("Response from contract:", tx.processed.action_traces[0].console)
  } catch (error) {
    console.log(error)
  }
}
async function get_create(id, user, data) {
  await push("1nodeinery", "create", { id, user, data }, actor, "active")
}
async function get_destroy(id) {
  await push("1nodeinery", "destroy", { id }, actor, "active")
}
async function main(id, user, data) {
    await get_create(id, user, data);
    await get_destroy(id);
}
main(148, process.env.name_account)