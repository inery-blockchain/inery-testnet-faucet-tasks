import { Api, JsonRpc, JsSignatureProvider } from "ineryjs";
import dotenv from "dotenv";
dotenv.config();

const url = "http://143.110.218.244:8888";

const json_rpc = new JsonRpc(url);
const private_key = "your key";

const account = "mehmet";
const actor = "mehmet";
const signature = new JsSignatureProvider([private_key]);

const api = new Api({
  rpc: json_rpc,
  signatureProvider: signature,
});

const PushTransaction = async (id, user, data, destroy) => {
  const Hashdata = { id, user, data };
  try {
    const createAction = {
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
    };

    const destroyAction = {
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
    };

    const actions = [createAction];
    if (destroy) {
      actions.push(destroyAction);
    }

    const tx = await api.transact(
      {
        actions,
      },
      { broadcast: true, sign: true }
    );

    console.log(tx, "\n");
    console.log("\nResponsed data:", tx.processed.action_traces[0].console);
  } catch (err) {
    console.log(err);
  }
};

PushTransaction(2701, account, "pust done", true);
