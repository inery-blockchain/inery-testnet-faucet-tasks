import { Api, JsonRpc, RpcError, JsSignatureProvider } from '../ineryjs/dist/index.js'

const url = 'http://ip:8888'
const get = new JsonRpc(url) 
const pkey = 'your_private_key'
const actor = 'your_inery_account'
const validation  = new JsSignatureProvider([pkey]);
const txn = new Api({ rpc: get, signatureProvider: validation })

async function push_tx(contract, action, data, actor, permission) {
  try {
    const tx = await txn.transact({
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
        console.log("=================== ===> AHBABY TXN SUCCESS <=== ======================")
        console.log("=======================================================================")
        console.log(tx, "\n")
        console.log("Response from contract :", tx.processed.action_traces[0].console)
        console.log("\n")
    }catch(error){
        console.log(error)
    }
}
async function txn_create(id, user, data) {
  await push_tx("astuti", "create", { id, user, data }, actor, "active")
}
async function txn_destroy(id) {
  await push_tx("astuti", "destroy", { id }, actor, "active")
}
async function main(id, user, data) {
    await txn_create(id, user, data);
    await txn_destroy(id);
}
main(148, 'astuti')