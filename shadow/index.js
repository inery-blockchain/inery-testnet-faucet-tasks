const { Api, JsonRpc, JsSignatureProvider } = require('ineryjs');
const dotenv = require('dotenv');

dotenv.config();

const { ACCOUNT, NODE_URL, PRIV_KEY } = process.env;

const account = ACCOUNT;

const jsonRpc = new JsonRpc(NODE_URL);
const signatureProvider = new JsSignatureProvider([PRIV_KEY]);

const tasks = [
  { action: 'create', data: { id: 50, account, data: 'CREATE record push transaction' } },
  { action: 'read', data: { id: 50 } },
  { action: 'update', data: { id: 50, data: 'UPDATE record push transaction' } },
  { action: 'destroy', data: { id: 50 } },
];

const ineryApi = new Api({
  rpc: jsonRpc,
  signatureProvider,
});


const accountAbi = await ineryApi.getAbi(account);


const pushTransaction = async (action, data = {}) => {
  try {
    const actions = [ineryApi.with(account).as(account)[action](...Object.values(data))];
    const result = await ineryApi.transact({ actions });
    console.log(result.processed.action_traces[0]);
  } catch (error) {
    console.error(error);
  }
};


for (const task of tasks) {
  await pushTransaction(task.action, task.data);
}
