import { Api, JsonRpc, RpcError, JsSignatureProvider } from "ineryjs/dist/index.js";
import * as dotenv from "dotenv";
dotenv.config();

const url = process.env.NODE_URL;
const json_rpc = new JsonRpc(url); 
const private_key = process.env.PRIVATE_KEY;
const actor = process.env.INERY_ACCOUNT;
const signature  = new JsSignatureProvider([private_key]);
const api = new Api({ rpc: json_rpc, signatureProvider: signature })

async function create(id, user, data) {
  try {
    const tx = await api.transact(
      {
        actions: [
          {
            account,
            name: "create",
            authorization: [
              {
                actor,
                permission: "active",
              },
            ],
            data: {
              id,
              user,
              data,
            },
          },
        ],
      },
      { broadcast: true, sign: true }
    );

    console.log("================================CREATE Transaction================================");

    console.log(tx, "\n");
    console.log("Response from contract :", tx.processed.action_traces[0].console);
  } catch (error) {
    console.log(error);
  }
}

create(5, account, "Create new Data");

