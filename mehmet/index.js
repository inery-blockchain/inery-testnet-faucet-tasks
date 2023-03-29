import { Api, JsonRpc, JsSignatureProvider } from 'ineryjs';
import dotenv from 'dotenv';
dotenv.config();

const account = process.env.ACCOUNT;
const actions = [
  { action: 'create', data: { id: 50, account, data: 'CREATE record push transaction' } },
  { action: 'read', data: { id: 50 } },
  { action: 'update', data: { id: 50, data: 'UPDATE record push transaction' } },
  { action: 'destroy', data: { id: 50 } }
];

const api = new Api({
  rpc: new JsonRpc(process.env.NODE_URL),
  signatureProvider: new JsSignatureProvider([process.env.PRIV_KEY])
});

async function pushTransaction(action, data = {}) {
  try {
    const result = await api.transact({
      actions: [api.with(account).as(account)[action](...Object.values(data))]
    });
    console.log(result.processed.action_traces[0])
  } catch (error) {
    console.error(error);
  }
}

for (const { action, data } of actions) {
  await pushTransaction(action, data);
}

const abi = await api.getAbi(account);
