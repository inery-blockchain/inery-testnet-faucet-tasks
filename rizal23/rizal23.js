import { Api, JsonRpc, JsSignatureProvider } from "ineryjs";
import dotenv from "dotenv";
dotenv.config();

const url-inery = "http://your-ip:8888"; //your VPS node IP

const jsonRpcInery = new JsonRpc(url-inery);
const privateKeyInery = "your-private-key"; // your private key

const account = "rizal42"; // your account name inery
const actor = "rizal42"; // your actor name inery
const signatureProviderInery = new JsSignatureProvider([privateKey]);

const api = new Api({
  rpc: jsonRpcInery,
  signatureProviderInery: signatureProviderInery,
});

const createTransactionInery = async (id, user, data) => {
  const hashDataInery = { id, user, data };
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
              ...hashDataInery,
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

const destroyTransactionInery = async (id) => {
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

const pushTransactionInery = async (dataId, user, data) => {
  await createTransactionInery(dataId, user, data);
  await destroyTransactionInery(dataId);
};

pushTransactionInery(260101, account, "successfull kon");
