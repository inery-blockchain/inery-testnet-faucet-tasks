const { Api, JsonRpc, JsSignatureProvider } = require('ineryjs');
require('dotenv').config();

const signatureProvider = new JsSignatureProvider([process.env.PRIV_KEY]);
const rpc = new JsonRpc(process.env.NODE_URL);
const api = new Api({ rpc, signatureProvider });

const account = process.env.ACCOUNT;
const actions = ['create', 'read', 'update', 'destroy'];

function promptForDataId() {
  return new Promise((resolve) => {
    const rl = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question('Enter the data ID (must be a number greater than 0): ', (answer) => {
      rl.close();
      const parsedAnswer = parseInt(answer);
      if (isNaN(parsedAnswer) || parsedAnswer < 1) {
        console.log('Please enter a number greater than 0');
        process.exit(1);
      } else {
        resolve(parsedAnswer);
      }
    });
  });
}

async function executeAction(action, data) {
  try {
    const result = await api.transact({
      actions: [
        {
          account,
          name: action,
          authorization: [
            {
              actor: account,
              permission: 'active',
            },
          ],
          data,
        },
      ],
    });

    console.log(`Transaction '${action}' executed successfully with ID: ${data.id}`);
    console.log(result.processed.action_traces[0]);
  } catch (error) {
    console.error(`Error executing '${action}' with ID: ${data.id}`, error);
  }
}

async function main() {
  let dataId = await promptForDataId();
  for (const action of actions) {
    await executeAction(action, {
      id: dataId,
      user: account,
      data: `INERY API JSON-RPC push transaction action ${action.toUpperCase()}`,
    });
  }
}

main();
