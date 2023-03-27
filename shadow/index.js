import { Api, JsonRpc, RpcError, JsSignatureProvider } from "ineryjs/dist/index.js";
import * as dotenv from "dotenv";
dotenv.config();

const config = {
  url: process.env.NODE_URL,
  privateKey: process.env.PRIVATE_KEY,
  actor: process.env.INERY_ACCOUNT,
};

const { url, privateKey, actor } = config;

const jsonRpc = new JsonRpc(url); 
const signature = new JsSignatureProvider([privateKey]);
const api = new Api({ rpc: jsonRpc, signatureProvider: signature })

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
