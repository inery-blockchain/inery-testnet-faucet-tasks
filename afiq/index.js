import { Api, JsonRpc, JsSignatureProvider } from "ineryjs";
import dotenv from "dotenv";
dotenv.config();
const url = process.env.NODE_ADDRESS;
const json_rpc = new JsonRpc(url);
const private_key = process.env.PRIVATE_KEY;
const account = process.env.ACCOUNT_NAME;
const actor = process.env.ACCOUNT_NAME;
const signature = new JsSignatureProvider([private_key]);
const api = new Api({
  rpc: json_rpc,
  signatureProvider: signature,
});


const CreateRecord = async (id, user, data) => {
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
    console.log("Create Record\n\n");
    console.log(tx);
  } catch (err) {
    console.log(err);
  }
};

const ReadRecord = async (id) => {
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
    console.log("Read Record\n\n");
    console.log(readId);
  } catch (error) {
    console.log(error);
  }
};

const DestroyRecord = async (id) => {
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
  await CreateRecord(DataId, user, data);
  await ReadRecord(DataId);
  await DestroyRecord(DataId);
};

PushTransaction(process.env.RECORD_ID, account, "RPC Push Test");