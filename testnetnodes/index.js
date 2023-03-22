// Import required modules
const { Api, JsonRpc } = require('ineryjs/dist/index.js');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Set up connection to blockchain
const rpcUrl = process.env.RPC_URL;
const rpc = new JsonRpc(rpcUrl);

// Set up account and private key
const accountName = process.env.ACCOUNT_NAME;
const privateKey = process.env.PRIVATE_KEY;

// Define function for performing a transaction
async function performTransaction(actionName, data) {
  // Set up authorization for the transaction
  const authorization = [{
    actor: accountName,
    permission: 'active',
  }];

  // Set up the transaction data
  const transactionData = {
    actions: [{
      account: '',
      name: actionName,
      authorization,
      data,
    }],
  };

  // Set up the API object with the appropriate signature provider
  const api = new Api({
    rpc,
    signatureProvider: [privateKey],
  });

  try {
    // Send the transaction to the blockchain
    const result = await api.transact(transactionData, {
      broadcast: true,
      sign: true,
    });

    // Log the transaction details
    console.log(`${actionName} transaction successful`);
    console.log(`Transaction ID: ${result.transaction_id}`);
    console.log('Processed action traces:', result.processed.action_traces);
  } catch (error) {
    console.error(`Error performing ${actionName} transaction:`, error);
  }
}

// Define main function
async function main() {
  // Perform create transaction
  const createData = {
    id: 6100,
    user: accountName,
    data: 'example transaction from script testnetnodes',
  };
  await performTransaction('create', createData);

  // Perform destroy transaction
  const destroyData = {
    id: 6100,
  };
  await performTransaction('destroy', destroyData);
}

// Call the main function to run the script
main();
