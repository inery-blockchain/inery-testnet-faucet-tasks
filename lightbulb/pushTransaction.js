import { Api, JsonRpc, JsSignatureProvider } from "ineryjs";
import dotenv from "dotenv";
dotenv.config();

const url = "http://154.53.62.133:8888";

const json_rpc = new JsonRpc(url);
const private_key = process.env.PRIVATE_KEY; // import private key from .env file;

const account = "lightbulb";
const actor = "lightbulb";
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

    console.log(tx);
  } catch (err) {
    console.log(err);
  }
};

const ReadTransaction = async (id) => {
  try {
    const readId = await api.transact(
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
    console.log(readId);
    console.log("Read Record\n\n");
  } catch (error) {
    console.log(error);
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

    console.log("Destroy Record\n\n");
    console.log(destroyTx);
  } catch (err) {
    console.log(err);
  }
};

const PushTransaction = async (DataId, user, data) => {
  await CreateTransaction(DataId, user, data);
  await ReadTransaction(DataId);
  await DestroyTrancsaction(DataId);
};

PushTransaction(1050, account, "RPC Push Transaction");
