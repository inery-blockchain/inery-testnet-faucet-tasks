import { Api, JsonRpc, RpcError, JsSignatureProvider } from '/root/ineryjs/dist/index.js'
import * as dotenv from 'dotenv'
dotenv.config()

const host = "http://77.68.12.116:8888"
const vonzy = new JsonRpc(host) 
const p_keys = process.env.privat_keys
const actor = process.env.account_node
const sign  = new JsSignatureProvider([p_keys]); 
const api = new Api({ rpc: vonzy, signatureProvider: sign })

async function vons(contract, action, data, actor, permission) {
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
    
    
        console.log("------------------------------------------------------------------------")
        console.log("---------------------> Transaction Successfully <-----------------------")
        console.log("------------------------------------------------------------------------")
        console.log(tx, "\n")
        console.log("Response from contract :", tx.processed.action_traces[0].console)
        console.log("\n")
    }catch(error){
        console.log(error)
    }
}
async function create_exc(id, user, data) {
  await vons("astuti", "create", { id, user, data }, actor, "active")
}
async function destroy_exc(id) {
  await vons("astuti", "destroy", { id }, actor, "active")
}
async function main(id, user, data) {
    await create_exc(id, user, data);
    await destroy_exc(id);
}
main(1, account, "INERY TESTNET JSON API DONE")