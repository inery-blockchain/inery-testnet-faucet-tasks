// Import required modules
const { Api, JsonRpc, JsSignatureProvider } = require('ineryjs');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();
const nodeUrl = process.env.NODE_URL;
const privateKey = process.env.PRIV_KEY;
const contractAccount = process.env.ACCOUNT;
const contractId = process.env.ID;

// Set up the API client
const rpc = new JsonRpc(nodeUrl);
const signatureProvider = new JsSignatureProvider([privateKey]);
const api = new Api({ rpc, signatureProvider });

// Define a function for sending transactions to the contract
async function sendTransaction(action, params) {
  try {
    // Build the transaction
    const transaction = api.buildTransaction();
    transaction.with(contractAccount).as(contractAccount)[action](...Object.values(params));
    
    // Send the transaction and log the result
    const result = await transaction.send();
    console.log(`Transaction successful: ${result.transaction_id}`);
  } catch (error) {
    console.error(`Transaction failed: ${error.message}`);
  }
}

// Define an async IIFE to execute the transactions
(async () => {
  try {
    // Call the 'create' method
    const createParams = { id: contractId, data: 'aliinery' };
    await sendTransaction('create', createParams);

    // Call the 'destroy' method
    const destroyParams = { id: contractId };
    await sendTransaction('destroy', destroyParams);
  } catch (error) {
    console.error(`Transaction failed: ${error.message}`);
  }
})();
