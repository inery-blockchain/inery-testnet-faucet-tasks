import { Api, JsonRpc, JsSignatureProvider } from "ineryjs";
import dotenv from "dotenv";
dotenv.config();

const url = "http://10.148.0.3:8888";

const jsonRpc = new JsonRpc(url);
const privateKey = "privet key"; 

const account = "rizal21";
const actor = "rizal21";
const signatureProvider = new JsSignatureProvider([privateKey]);

const api = new Api({
  rpc: jsonRpc,
  signatureProvider,
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
    console.log("Response data:", tx.processed.action_traces[0].console);
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

    console.log(`Record with id ${id} destroyed by rizal21\n\n`);
    console.log(destroyTx, "\n");
    console.log("Responses: \n", destroyTx.processed.action_traces[0].console);
  } catch (err) {
    console.log(err);
  }
};

const pushTransaction = async (dataId, user, data) => {
  await createTransaction(dataId, user, data);
  await destroyTransaction(dataId);
};

pushTransaction(1021, account, "push transaction by rizal21");
