import { Api, JsonRpc, JsSignatureProvider } from "ineryjs";
import dotenv from "dotenv";

dotenv.config();

const url = "http://66.175.235.233:8888";
const rpc = new JsonRpc(url);

const privateKey = process.env.PRIVATE_KEY;
const account = "rizal23";
const actor = account;
const signatureProvider = new JsSignatureProvider([privateKey]);

const api = new Api({
  rpc,
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
            data: hashData,
          },
        ],
      },
      { broadcast: true, sign: true }
    );

    console.log(tx, "\n");
    console.log("Response data:", tx.processed.action_traces[0].console);
  } catch (error) {
    console.log(error);
  }
};

const destroyTransaction = async (id) => {
  try {
    const tx = await api.transact(
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

    console.log(`Record with ID ${id} destroyed by ${account}\n\n`);
    console.log(tx, "\n");
    console.log("Response data:", tx.processed.action_traces[0].console);
  } catch (error) {
    console.log(error);
  }
};

const pushTransaction = async (dataId, user, data) => {
  await createTransaction(dataId, user, data);
  await destroyTransaction(dataId);
};

pushTransaction(1, account, "push transaction by rizal23");
