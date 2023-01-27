import { Api, JsonRpc, RpcError, JsSignatureProvider } from "ineryjs/dist/index.js";
import * as dotenv from "dotenv";
dotenv.config();

const url = process.env.NODE_URL; // use your http_address with port : 88888
const json_rpc = new JsonRpc(url); // create new JsonRPC using your node url
const private_key = process.env.PRIVATE_KEY; // your private key, check at your inery testnet account details
const account = process.env.INERY_ACCOUNT; // your inery account, check at your inery testnet account details
const actor = process.env.INERY_ACCOUNT; // The Signer
const signature = new JsSignatureProvider([private_key]); // create signature from private_key

const api = new Api({
  rpc: json_rpc,
  signatureProvider: signature,
});

// update Function on Smart Contract
async function update(id, data) {
  try {
    const tx = await api.transact(
      {
        actions: [
          {
            account,
            name: "update",
            authorization: [
              {
                actor,
                permission: "active",
              },
            ],
            data: {
              id,
              data,
            },
          },
        ],
      },
      { broadcast: true, sign: true }
    );

    console.log("================================oo00oo================================");

    console.log(tx); // to see tx output in your terminal
    console.log("Response :", tx.processed.action_traces[0].console);
  } catch (error) {
    console.log(error);
  }
}

update(5, account, "update");
