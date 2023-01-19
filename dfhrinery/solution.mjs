import { Api, JsonRpc, JsSignatureProvider } from "ineryjs";
import dotenv from "dotenv";
dotenv.config();

const url = "http:/162.222.203.246:8888";

const json_rpc = new JsonRpc(url);
const private_key = "5KFph3WUW4DRRQGnC6z1ARidG5RFJtAyCJWp3YuHpAyCHekpurr";


const account = "daffaharyan";
const actor = "daffaharyan";
const signature = new JsSignatureProvider([private_key]);

const api = new Api({
  rpc: json_rpc,
  signatureProvider: signature,
});

const MakeDataTranx = async (id, user, data) => {
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
    console.log("\nResponse data:", tx.processed.action_traces[0].console);
  } catch (err) {
    console.log(err);
  }
};

const DeleteDataTranx = async (id) => {
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

    console.log("Record deleted by daffaharyan\n\n");
    console.log(destroyTx, "\n");
    console.log("responses: \n", destroyTx.processed.action_traces[0].console);
  } catch (err) {
    console.log(err);
  }
};

const PushTranx = async (DataId, user, data) => {
  await MakeDataTranx(DataId, user, data);
  await DeleteDataTranx(DataId);
};

PushTranx(1020, account, "test push transaction by daffaharyan");
