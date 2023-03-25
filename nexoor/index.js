import { Api, JsonRpc, JsSignatureProvider } from 'ineryjs';
import dotenv from 'dotenv';
import readline from 'readline';

dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const { ACCOUNT, NODE_URL, PRIV_KEY } = process.env;
const actions = ['create', 'read', 'update', 'destroy'];
const bline = '==============='

const api = new Api({
  rpc:  new JsonRpc(NODE_URL),
  signatureProvider: new JsSignatureProvider([PRIV_KEY])
});

let dataId;

async function promptForDataId() {
  return new Promise((resolve, reject) => {
    rl.question(`Enter the data ID (must be a number greater than 0): `, (answer) => {
      dataId = parseInt(answer);
      if (isNaN(dataId) || dataId < 1) {
        console.log(`Please enter a number greater than 0`);
        rl.close();
        reject();
      } else {
        resolve();
      }
    });
  });
}

async function executeCrudTx(name) {
  try {
    const result = await api.transact({
      actions: [
        {
          account: ACCOUNT,
          name,
          authorization: [
            {
              actor: ACCOUNT,
              permission: 'active'
            }
          ],
          data: {
            id: dataId,
            user: ACCOUNT,
            data: `INERY API JSON-RPC push transaction action ${name.toUpperCase()}`
          }
        }
      ]
    });

    console.log(`\n${bline} ${name.toUpperCase()} Push transaction successful with ID: ${dataId} ${bline}\n`, result.processed.action_traces[0], '\n');

  } catch (error) {
    console.error(`\n${bline} Error executing ${name.toUpperCase()} with ID: ${dataId} ${bline}\n`, error, '\n');
  }
}

async function executeAllCrudTx() {
  for (const crud of actions) {
    await executeCrudTx(crud);
  }
  rl.close();
}

async function main() {
  try {
    await promptForDataId();
    await executeAllCrudTx();
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

main();