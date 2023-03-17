import { Api, JsonRpc, JsSignatureProvider } from "ineryjs";
import dotenv from "dotenv";
dotenv.config();

const url = "http://your-ip:8888"; //your VPS node IP

const jsonRpc = new JsonRpc(url);
const privateKey = "your-private-key"; // your private key

const account = "rizal42"; // your account name inery
const actor = "rizal42"; // your actor name inery
const signatureProvider = new JsSignatureProvider([privateKey]);

const api = new Api({
  rpc: jsonRpc,
  signatureProvider: signatureProvider,
});

const createTransaction = async (id, user, data) => {
  const hashData = { id, user, data };
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
              ...hashData,
            },
          },
        ],
      },
      { broadcast: true, sign: true }
    );

    console.log(tx, "\n");
    console.log("\nResponse data:", tx.processed.action_traces[0].console);
  } catch (err) {
    console.log(err);
  }
};

const destroyTransaction = async (id) => {
  try {
    const destroyTx = await api.transact(
      {
        actions: [
          {
            account,
            name: "destroy",
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

    console.log("Record destroyed\n\n");
    console.log(destroyTx, "\n");
    console.log("Responses: \n", destroyTx.processed.action_traces[0].console);
  } catch (err) {
    console.log(err);
  }
};

const pushTransaction = async (dataId, user, data) => {
  console.log("Loading data, please wait...\n"); // Added ASCII art for loading message
  console.log(`     /\\_/\\   
    ( o.o )  
     > ^ <`); 
  await createTransaction(dataId, user, data);
  await destroyTransaction(dataId);
};

pushTransaction(999, account, "done");
