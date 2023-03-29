import { Api, JsonRpc, JsSignatureProvider } from 'ineryjs';
import dotenv from 'dotenv';
dotenv.config();

const ACCOUNT_NAME = ACCOUNT;
const ACTIONS = [
  { action: 'create', data: { id: 123, account: ACCOUNT_NAME, data: 'CREATE transaction' } },
  { action: 'read', data: { id: 123, data: 'READ transaksion' } },
  { action: 'update', data: { id: 123, data: 'UPDATE transaksion' } },
  { action: 'destroy', data: { id: 123, data: 'DESTROY transaksion' } }
];

const rpc = new JsonRpc(NODE_URL);
const signatureProvider = new JsSignatureProvider([PRIVET_KEY]);
const api = new Api({ rpc, signatureProvider });

async function pushTransaction(action, data = {}) {
  try {
    const result = await api.transact({
      actions: [api.with(ACCOUNT_NAME).as(ACCOUNT_NAME)[action](...Object.values(data))]
    });
    console.log(result.processed.action_traces[0])
  } catch (error) {
    console.error(error);
  }
}

for (const { action, data } of ACTIONS) {
  await pushTransaction(action, data);
}

const abi = await api.getAbi(ACCOUNT_NAME);
