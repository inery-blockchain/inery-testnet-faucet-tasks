// Import necessary modules
import { Api, JsonRpc, JsSignatureProvider } from 'ineryjs';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Destructure environment variables
const { NODE_URL, PRIV_KEY, ACCOUNT, DATA_ID } = process.env;

// Initialize INERY API with required configurations
const api = new Api({
  rpc: new JsonRpc(NODE_URL),
  signatureProvider: new JsSignatureProvider([PRIV_KEY]),
});

// Define names of actions to be performed
const names = ['create', 'read', 'update', 'destroy'];

// Define a separator string to be used for console output
const separator = "=====================================================";

// Define an asynchronous function to push transactions to the blockchain
async function pushTransaction() {
  // Loop through each action in the array of action names
  for (const name of names) {
    try {
      // Send the transaction to the blockchain using INERY API
      const result = await api.transact({
        actions: [
          {
            account: ACCOUNT,
            name,
            authorization: [{ actor: ACCOUNT, permission: 'active' }],
            data: {
              id: DATA_ID,
              user: ACCOUNT,
              data: 'INERY Javascript API push transaction',
            },
          },
        ],
      });

      // Extract relevant data from the transaction result object
      const { block_time, block_num, trx_id, act } = result.processed.action_traces[0];

      // Output details of the transaction to the console
      console.info(`${separator}\n${name.toUpperCase()} transaction successful details:\n`);
      console.info(`Block time\t:${block_time}\nBlock number\t:${block_num}\nTransaction ID\t:${trx_id}\nActions\t\t:\n${JSON.stringify(act, null, 2)}`);
      console.info(`${separator}\n`);

    } catch (error) {
      // Output error message to the console if the transaction fails
      console.error(`Error executing ${name.toUpperCase()} transaction: ${error}`);
    };
  };
};

// Calling transaction function
pushTransaction();
