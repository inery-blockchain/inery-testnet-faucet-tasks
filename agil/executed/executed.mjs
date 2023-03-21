import { Api, JsonRpc, RpcError, JsSignatureProvider } from '/root/ineryjs/dist/index.js'
import * as dotenv from 'dotenv'
dotenv.config()

const server = process.env.ip_url
const provide = new JsonRpc(server) 
const New_key = process.env.pk_inery
const actor = process.env.username_inery
const validation  = new JsSignatureProvider([New_key]);
const get = new Api({ rpc: provide, signatureProvider: validation })

async function exed(contract, action, data, actor, permission) {
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
    
    
    console.log("=======================================================================")
        console.log("===================== Transaction Complete ========================")
        console.log("=======================================================================")
        console.log(tx, "\n")
        console.log("Response from contract :", tx.processed.action_traces[0].console)
        console.log("\n")
    }catch(error){
        console.log(error)
    }
}
async function create_tx(id, user, data) {
  await exed("agil", "create", { id, user, data }, actor, "active")
}
async function destroy_tx(id) {
  await exed("agil", "destroy", { id }, actor, "active")
}
async function main(id, user, data) {
    await create_tx(id, user, data);
    await destroy_tx(id);
}
main(148, process.env.username_inery)