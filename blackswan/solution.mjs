import { Api, JsonRpc, JsSignatureProvider } from 'ineryjs/dist/index.js';
import * as dotenv from 'dotenv';

dotenv.config();

const rpcUrl = "http://3.25.95.128:8888";
const privateKey = process.env.PRIVATE_KEY;
const actor = process.env.INERY_ACCOUNT;
const account = "blackswan";

const signatureProvider = new JsSignatureProvider([privateKey]); 
const rpc = new JsonRpc(rpcUrl);
const api = new Api({ rpc, signatureProvider });

async function createRecord(id, user, data) {
  try {
    const tx = await api.transact({
      actions: [
        {
          account,
          name: "create",
          authorization: [{
            actor,
            permission: "active"
          }],
          data: { id, user, data }
        }
      ]
    }, { broadcast: true, sign: true });

    console.log("\nTransaction Details [Create]:");
    console.log("=============================");
    console.log(tx);
