//Import module
import { Api, JsonRpc, RpcError, JsSignatureProvider } from '../dist/index.js'
import * as dotenv from 'dotenv'
dotenv.config()
const url = process.env.NODE_URL
const json_rpc = new JsonRpc(url)
const private_key = process.env.PRIVATE_KEY;
const account = process.env.INERY_ACCOUNT
const actor = process.env.INERY_ACCOUNT
const signature  = new JsSignatureProvider([private_key]);
const api = new Api({
    rpc: json_rpc,
    signatureProvider: signature
})
const transfer = async () => {
  const result = await api.transact({
    actions: [
      {
        account: "inery.token",
        name: "transfer",
        authorization: [
          {
            actor: "paculenmat1",
            permission: "active",
          },
        ],
        data: {
          from: "paculenmat1",
          to: "inery",
          quantity: "10 PACULMT",
          memo: "This token for testing transfer",
        },
      },
    ],
  });
  console.log(result);
  console.log(result.processed.action_traces[0]);
};

transfer();

