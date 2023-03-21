import { Api, JsonRpc, RpcError, JsSignatureProvider } from '/root/ineryjs/dist/index.js'
import * as dotenv from 'dotenv'
dotenv.config()

const host = "http://149.102.137.131:8888"
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

async function create_or_destroy_exc(id, user, data, action) {
  await vons("mertorakk", action, { id, user, data }, actor, "active")
}

async function main(id, user, data) {
    await create_or_destroy_exc(id, user, data, "create");
    await create_or_destroy_exc(id, null, null, "destroy");
}

main(1, account, "Example transaction from mertorakk script")
