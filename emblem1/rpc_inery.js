//inerypush
import { Api, JsonRpc, JsSignatureProvider } from "ineryjs";
import dotenv from "dotenv";
dotenv.config();

const url = "http://143.198.159.250:8888";

const json_rpc = new JsonRpc(url);
const private_key = process.env.PRIVATE_KEY; // import private key from .env file;

const account = "awan";
const actor = "awan";
const signature = new JsSignatureProvider([private_key]);

const api = new Api({
  rpc: json_rpc,
  signatureProvider: signature,
});

const CreateTransaction = async (id, user, data) => {
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

    console.log("===========================================================");
    console.log(tx, "\n");
    console.log("===========================================================");
    console.log("\nResponse data:", tx.processed.action_traces[0].console);
  } catch (err) {
    console.log(err);
    console.log("===========================================================");
  }
};

const DestroyTrancsaction = async (id) => {
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

    console.log("===========================================================");
    console.log("destroyed by emblem1\n\n");
    console.log("===========================================================");
    console.log(destroyTx, "\n");
    console.log("===========================================================");
    console.log("responses: \n", destroyTx.processed.action_traces[0].console);
    console.log("===========================================================");
  } catch (err) {
    console.log("===========================================================");
    console.log(err);
  }
};

const PushTransaction = async (DataId, user, data) => {
  await CreateTransaction(DataId, user, data);
  await DestroyTrancsaction(DataId);
};

PushTransaction(18, account, "test by emblem1");
