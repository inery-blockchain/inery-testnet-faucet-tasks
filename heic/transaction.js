import { Api, JsonRpc, JsSignatureProvider } from "ineryjs";
import dotenv from "dotenv";
dotenv.config();

const node_url = "http://node_url";

const JsonRPC = new JsonRpc(node_url);
const PrivateKey = process.env.PRIVATEKEY;

const main_acc = process.env.INR_ACC;
const actor = process.env.INR_ACC;
const signature = new JsSignatureProvider([PrivateKey]);

const api = new Api({
  rpc: JsonRPC,
  signatureProvider: signature,
});

const CreateRecordTx = async (id, user, data) => {
  const Hashdata = { id, user, data };
  try {
    const txresult = await api.transact(
      {
        actions: [
          {
            main_acc,
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

const ReadRecordTx = async (id) => {
  try {
    const readresult = await api.transact(
      {
        actions: [
          {
            main_acc,
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
    console.log("This is Read Record\n\n");
  } catch (error) {
    console.log(error);
  }
};

const DestroyRecordTx = async (id) => {
  try {
    const destroyresult = await api.transact(
      {
        actions: [
          {
            main_acc,
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

    console.log("Destroy Record Result\n\n");
    console.log(destroyTx);
  } catch (err) {
    console.log(err);
  }
};

const pushtx = async (DataId, user, data) => {
  await CreateRecordTx(DataId, user, data);
  await ReadRecordTx(DataId);
  await DestroyRecordTx(DataId);
};

pushtx(5, main_acc, "This is testing to try RPC Push Transaction");
