import { Api, JsonRpc, RpcError, JsSignatureProvider } from '../dist/index.js'
import * as dotenv from 'dotenv'
dotenv.config()

const get_link = process.env.nodeurl
const get_rpc = new JsonRpc(get_link)
const newprivkey = process.env.privkey;
const verif  = new JsSignatureProvider([newprivkey]);
const account = process.env.acc
const actor = process.env.acc
const nodes = new Api({
    rpc: get_rpc,
    signatureProvider: verif
})
async function create(id, user, data) {
  try {
    const tx = await nodes.transact({
      actions: [
        {
          account,
          name: 'create',
          authorization: [{ actor, permission: 'active' }],
          data: { id, user, data },
        },
      ],
    }, { broadcast: true, sign: true });

    console.log(tx);
    console.log(tx.processed.action_traces[0].console);
  } catch (error) {
    console.log(error);
  }
}
async function notif(id, user, data){
    await create(id, user, data)
}
notif(3541, account,"RPC PUSH API NOTIFICAION")  

