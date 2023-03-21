import { Api, JsonRpc, JsSignatureProvider } from "ineryjs";
import dotenv from "dotenv";
dotenv.config();

const rpcEndpoint = "http://10.148.0.3:8888";
const privateKey = "privet key";
const accountName = "rizal21";
const permissionName = "active";

const jsonRpc = new JsonRpc(rpcEndpoint);
const signatureProvider = new JsSignatureProvider([privateKey]);
const api = new Api({ rpc: jsonRpc, signatureProvider });

const createAction = async (account, data) => {
  try {
    const tx = await api.transact({
      actions: [{
        account,
        name: "create",
        authorization: [{ actor: accountName, permission: permissionName }],
        data,
      }],
    }, { broadcast: true, sign: true });

    console.log("Create Transaction: ", tx, "\n");
    console.log("Response Data:", tx.processed.action_traces[0].console);
  } catch (error) {
    console.log(error);
  }
};

const destroyAction = async (account, id) => {
  try {
    const tx = await api.transact({
      actions: [{
        account,
        name: "destroy",
        authorization: [{ actor: accountName, permission: permissionName }],
        data: { id },
      }],
    }, { broadcast: true, sign: true });

    console.log(`Record with id ${id} destroyed by ${accountName}\n\n`);
    console.log("Destroy Transaction:", tx, "\n");
    console.log("Response Data:", tx.processed.action_traces[0].console);
  } catch (error) {
    console.log(error);
  }
};

const pushTransaction = async (id, user, data) => {
  await createAction(accountName, { id, user, data });
  await destroyAction(accountName, id);
};

pushTransaction(1021, accountName, "push transaction by rizal21");
