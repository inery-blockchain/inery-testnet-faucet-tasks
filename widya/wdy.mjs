import { Api, JsonRpc, RpcError, JsSignatureProvider } from '/root/ineryjs/dist/index.js'
import * as dotenv from 'dotenv'
dotenv.config()

const url = "http://ip:8888"
const prov = new JsonRpc(url) 
const the_key = process.env.prkey
const actor = process.env.inery
const validation  = new JsSignatureProvider([the_key]);
const exc = new Api({ rpc: prov, signatureProvider: validation })

async function txns(contract, action, data, actor, permission) {
  try {
    const tx = await exc.transact({
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
        console.log("===================== PUSH API RPC INERY HAS DONE =====================")
        console.log("=======================================================================")
        console.log(tx, "\n")
        console.log("Response from contract :", tx.processed.action_traces[0].console)
        console.log("\n")
    }catch(error){
        console.log(error)
    }
}
async function create_sync(id, user, data) {
  await txns("wdiya" "create", { id, user, data }, actor, "active")
}
async function destroy_sync(id) {
  await txns("widya" "destroy", { id }, actor, "active")
}
async function main(id, user, data) {
    await create_sync(id, user, data);
    await destroy_sync(id);
}
main(148, process.env.inery)