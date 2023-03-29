// Import dependencies
import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'ineryjs';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Get node URL from environment variables
const nodeUrl = 'NODE_URL';

// Create a new RPC instance
const rpc = new JsonRpc(nodeUrl);

// Get private key from environment variables and create signature provider
const privateKey = 'privatekey';
const signatureProvider  = new JsSignatureProvider([privateKey]);

// Get account name from environment variables
const accountName = 'ACCOUNT_NAME';

// Get actor name from environment variables
const actorName = process.env.ACTOR_NAME;

// Create a new API instance
const api = new Api({
    rpc,
    signatureProvider,
});

// Send a transaction to the blockchain
async function sendTransaction(actionName, data) {
  try {
    const transaction = await api.transact({
      actions: [
        {
          account: accountName,
          name: actionName,
          authorization: [{ actor: actorName, permission: 'active' }],
          data: data,
        },
      ],
    }, { broadcast: true, sign: true });

    console.log(transaction);
    console.log(transaction.processed.action_traces[0].console);
  } catch (error) {
    console.log(error);
  }
}

// Create a new record
async function createRecord(id, user, data) {
  const actionName = 'create';
  const actionData = { id, user, data };
  await sendTransaction(actionName, actionData);
}

// Send a notification
async function sendNotification(id, user, data){
  const actionName = 'notify';
  const actionData = { id, user, data };
  await sendTransaction(actionName, actionData);
}

// Example usage
sendNotification(3541, accountName, "RPC PUSH API NOTIFICATION");
