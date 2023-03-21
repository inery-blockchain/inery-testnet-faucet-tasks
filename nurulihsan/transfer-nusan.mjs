import { Api, JsonRpc, RpcError, JsSignatureProvider } from "ineryjs/dist/index.js";
import * as dotenv from "dotenv";
dotenv.config();

const url = process.env.NODE_URL;
const json_rpc = new JsonRpc(url);
const private_key = process.env.PRIVATE_KEY;
const actor = process.env.INERY_ACCOUNT;
const signature  = new JsSignatureProvider([private_key]);
const api = new Api({ rpc: json_rpc, signatureProvider: signature })

async function transfer(from, to, quantity, memo) {
  try {
    const tx = await api.transact(
      {
        actions: [
          {
            account,
            name: "transfer",
            authorization: [
              {
                actor,
                permission: "active",
              },
            ],
            data: {
              from,
              to,
              quantity,
              memo
            },
          },
        ],
      },
      { broadcast: true, sign: true }
    );

    console.log("================================Transfer detail================================");

    console.log(tx); // to see tx output in your terminal
    console.log("Response :", tx.processed.action_traces[0].console);
  } catch (error) {
    console.log(error);
  }
}

transfer(actor, "inery", token, "Free From RPC")
