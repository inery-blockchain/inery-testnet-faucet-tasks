import { Api, JsonRpc, JsSignatureProvider } from "ineryjs";
import dotenv from "dotenv";
dotenv.config();

const url = "http://your ip:8888"; //your ip vps node

const json_rpc = new JsonRpc(url);
const private_key = "your key"; // iyour private key 

const account = "rizal21"; // your name inery
const actor = "rizal21"; //your name inery 
const signature = new JsSignatureProvider([private_key]);

const api = new Api({
  rpc: json_rpc,
  signatureProvider: signature,
});

const createTransaction = async (id, user, data) => {
  const Hashdata = { id, user, data };
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
              ...Hashdata,
            },
          },
        ],
      },
      { broadcast: true, sign: true }
    );

    console.log(tx, "\n");
    console.log("\nResponsed data:", tx.processed.action_traces[0].console);
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

    console.log("Record destroyede done successfull\n\n");
    console.log(destroyTx, "\n");
    console.log("responses: \n", destroyTx.processed.action_traces[0].console);
  } catch (err) {
    console.log(err);
  }
};

const pushTransaction = async (DataId, user, data) => {
  await createTransaction(DataId, user, data);
  await destroyTransaction(DataId);
};

pushTransaction(7191, account, "done done successfull");
