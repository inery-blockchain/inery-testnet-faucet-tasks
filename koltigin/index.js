const { Api, JsonRpc, JsSignatureProvider } = require('ineryjs');
const dotenv = require('dotenv');
dotenv.config();

// Get environment variables
const rpcEndpoint = process.env.RPC_ENDPOINT;
const privateKey = process.env.PRIVATE_KEY;
const accountName = process.env.ACCOUNT_NAME;

// Create JSON-RPC and signature provider objects
const rpc = new JsonRpc(rpcEndpoint);
const signatureProvider = new JsSignatureProvider([privateKey]);

// Create an API instance for interacting with the network
const api = new Api({ rpc, signatureProvider });

// Define the actions to execute
const actions = [
  { name: 'create', data: { id: 1, user: accountName, data: 'INERY JSON-RPC create transaction' } },
  { name: 'read', data: { id: 1, user: accountName, data: 'INERY JSON-RPC read transaction' } },
  { name: 'update', data: { id: 1, user: accountName, data: 'INERY JSON-RPC update transaction' } },
  { name: 'destroy', data: { id: 1, user: accountName, data: 'INERY JSON-RPC destroy transaction' } }
];

// Define a function to execute a single transaction
async function pushTransaction(action) {
  try {
    const authorization = [{ actor: accountName, permission: 'active' }];
    const result = await api.transact({
      actions: [{
        account: accountName,
        name: action.name,
        authorization,
        data: action.data
      }]
    }, { broadcast: true, sign: true });

    console.log(`\n${action.name.toUpperCase()} transaction details:`);
    console.log(`Transaction ID: ${result.processed.id}`);
    console.log(`Block number: ${result.processed.block_num}`);
    console.log(`Action detail:\n`, result.processed.action_traces[0].act);
  } catch (error) {
    console.error(`Error executing ${action.name.toUpperCase()} transaction: ${error.details[0].message}`);
  }
}

// Define a function to execute all transactions
async function pushAllTransactions() {
  for (const action of actions) {
    await pushTransaction(action);
  }
}

// Execute all transactions
pushAllTransactions();