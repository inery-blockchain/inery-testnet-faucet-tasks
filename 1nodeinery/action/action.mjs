import { Api, JsonRpc, RpcError, JsSignatureProvider } from '../dist/index.js'
import * as dotenv from 'dotenv' 
dotenv.config()

const LINK = process.env.VPS;
const OLDRPC = new JsonRpc(LINK);
const PKEY = process.env.VIKEY;
const account = process.env.INERYACCOUNT;
const actor = process.env.INERYACCOUNT;
const PROOF = new JsSignatureProvider([PKEY]);

const Get = new Api({
    rpc: OLDRPC,
    signatureProvider: PROOF
})

async function create(id, user, data) {
  try {
    const tx = await Get.transact({
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
create(7777, account, 'via JSON RPC')