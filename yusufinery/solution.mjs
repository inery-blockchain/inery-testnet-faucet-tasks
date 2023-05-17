import { Api, JsonRpc, JsSignatureProvider } from 'ineryjs/dist/index.js';
import * as dotenv from 'dotenv';
dotenv.config();

const url = "http://5.161.181.217:8888";
const account = process.env.INERY_ACCOUNT;
const private_key = process.env.PRIVATE_KEY;

const json_rpc = new JsonRpc(url);
const signature = new JsSignatureProvider([private_key]);
const api = new Api({
  rpc: json_rpc,
  signatureProvider: signature
});

async function sendTransaction(actions) {
  try {
    const tx = await api.transact({
      actions
    }, { broadcast: true, sign: true });

    console.log("=============================================================");
    console.log("================= Transaction Details =======================");
    console.log("=============================================================");
    console.log(tx, "\n");
    console.log("Response from contract:", tx.processed.action_traces[0].console);
    console.log("\n");
  } catch (error) {
    console.log(error);
  }
}

async function create(id, user, data) {
  const actions = [
    {
      account,
      name: "create",
      authorization: [
        {
          actor,
          permission: "active"
        }
      ],
      data: {
        id,
        user,
        data
      }
    }
  ];
  await sendTransaction(actions);
}

async function destroy(id) {
  const actions = [
    {
      account,
      name: "destroy",
      authorization: [
        {
          actor,
          permission: "active"
        }
      ],
      data: {
        id
      }
    }
  ];
  await sendTransaction(actions);
}

async function main(id, user, data) {
  await create(id, user, data);
  await destroy(id);
}

main(1, account, "CRUD Transaction via JSON RPC");