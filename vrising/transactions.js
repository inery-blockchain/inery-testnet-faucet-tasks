import { Api, JsonRpc, JsSignatureProvider } from "ineryjs";
import dotenv from "dotenv";
dotenv.config();

const jsonRpc = new JsonRpc(process.env.URL_NODE);
const account = "vrising";
const actor = "vrising";
const privateKey = process.env.PRIVATE_KEY;
const signatureProvider = new JsSignatureProvider([privateKey]);

const api = new Api({
  rpc: jsonRpc,
  signatureProvider,
});

const createRecord = async (id, data, user) => {
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
    console.log("Transaction successful:", tx);
  } catch (error) {
    console.error("Transaction failed:", error);
  }
};

const readRecord = async (id) => {
  try {
    const tx = await api.transact(
      {
        actions: [
          {
            account,
            name: "read",
            authorization: [
              {
                actor,
                permission: "active",
              },
            ],
            data: {
              id,
            },
          },
        ],
      },
      { broadcast: true, sign: true }
    );
    console.log("Transaction successful:", tx);
  } catch (error) {
    console.error("Transaction failed:", error);
  }
};

createRecord(53112, "inery task4", account);
setTimeout(() => {
  readRecord(53112);
}, 5000);
