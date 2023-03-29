import { Api, JsonRpc, JsSignatureProvider } from 'ineryjs';
import dotenv from 'dotenv';
dotenv.config();

const account = process.env.ACCOUNT;
const actions = [
  { action: 'create', data: { id: 123, account, data: 'CREATE transaction' } },
  { action: 'read', data: { id: 123, account, data: 'READ transaction' } },
  { action: 'update', data: { id: 123, data: 'UPDATE transaction' } },
  { action: 'destroy', data: { id: 123, data: 'DESTROY transaction' } }
];

const api = new Api({
  rpc: new JsonRpc(process.env.NODE_URL),
  signatureProvider: new JsSignatureProvider([process.env.PRIV_KEY])
});

async function pushTransaction(action, data = {}) {
  try {
    await api.getAbi(account); // memastikan bahwa ABI sudah dicache sebelum menggunakan ActionBuilder
    const result = await api.transact({
      actions: [api.with(account).as(account)[action](...Object.values(data))]
    });
    console.log(result.processed.action_traces[0])
  } catch (error) {
    console.error(error);
  }
}

async function run() {
  await api.getAbi(account); // memastikan bahwa ABI sudah dicache sebelum melakukan iterasi pada actions
  for (const { action, data } of actions) {
    await pushTransaction(action, data);
  }
}

run();
