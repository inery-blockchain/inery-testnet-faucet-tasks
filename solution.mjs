import { Api, JsonRpc,RpcError, JsSignatureProvider } from 'ineryjs';
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

async function pushTransaction(actionName, data) {
  try {
    const result = await api.transact({
      actions: [{
        account: contractName,
        name: actionName,
        authorization: [{
          actor: accountName,
          permission,
        }],
        data,
      }]
    }, {
      blocksBehind: 3,
      expireSeconds: 30,
    });
    console.log(result);
  }
    catch (e) {
    console.log('\nCaught exception: ' + e);
    if (e instanceof RpcError)
        console.log(JSON.stringify(e.json, null, 2));
    }
}

async function main() {
    await pushTransaction('create', { id: 1, user: accountName, data: 'hello' });
    await pushTransaction('destroy', { id: 1 });
    }
main();

// Path: solution.js
// Compare this snippet from sol.js:
