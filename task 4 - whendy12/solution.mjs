import { Api, JsonRpc, JsSignatureProvider } from 'ineryjs';
import * as dotenv from 'dotenv';
dotenv.config();

const server = process.env.inery_url;
const privateKey = process.env.privateKey;
const accountName = process.env.username_inery;
const contractName = 'usercontract';
const permission = 'active';
const rpc = new JsonRpc(server);
const signatureProvider = new JsSignatureProvider([privateKey]);
const api = new Api({ rpc, signatureProvider });

async function pushTransaction(actionName, data, actor) {
  try {
    const result = await api.transact({
      actions: [{
        account: contractName,
        name: actionName,
        authorization: [{ actor, permission }],
        data
      }]
    }, { broadcast: true, sign: true });
    
    console.log("Transaction ID: ", result.transaction_id);
    console.log(result, "\n");
    console.log("Response from contract :", result.processed.action_traces[0].console);
    console.log("\n");
  } catch (error) {
    console.log(error);
  }
}

async function createTx(id, user, data, memo) {
    await pushTransaction("mycontract", { id, user, data, memo }, accountName, "active");
}
  
async function destroyTx(id, memo) {
    await pushTransaction("mycontract", { id, memo }, accountName, "active");
}
  
async function main(id, user, data, memo) {
  await createTx(id, user, data, memo);
  await destroyTx(id, memo);
}

main(150, accountName);
