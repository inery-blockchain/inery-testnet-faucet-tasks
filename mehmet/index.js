import { Api, JsonRpc, JsSignatureProvider } from "ineryjs";
import dotenv from "dotenv";
dotenv.config();

const url = "http://143.110.218.244:8888";
const account = "mehmet";
const actor = "mehmet";
const private_key = "your key";
const json_rpc = new JsonRpc(url);
const signature = new JsSignatureProvider([private_key]);

const api = new Api({ rpc: json_rpc, signatureProvider: signature });

const createAction = (id, user, data) => ({
  account,
  name: "create",
  authorization: [{ actor, permission: "active" }],
  data: { id, user, data },
});

const destroyAction = (id) => ({
  account,
  name: "destroy",
  authorization: [{ actor, permission: "active" }],
  data: { id },
});

const PushTransaction = async (id, user, data, destroy) => {
  try {
    const actions = [createAction(id, user, data)];
    if (destroy) actions.push(destroyAction(id));

    const tx = await api.transact(
      { actions },
      { broadcast: true, sign: true }
    );

    console.log(tx, "\n");
    console.log("\nResponsed data:", tx.processed.action_traces[0].console);
  } catch (err) {
    console.log(err);
  }
};

PushTransaction(2701, account, "push done", true);
