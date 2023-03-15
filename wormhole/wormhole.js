import { Api, JsonRpc, JsSignatureProvider } from 'ineryjs';
import dotenv from 'dotenv';
dotenv.config();

const account = process.env.ACCOUNT;

const api = new Api({
  rpc: new JsonRpc(process.env.NODE_URL),
  signatureProvider: new JsSignatureProvider([process.env.PRIV_KEY])
});

const abi = await api.getAbi(account)

async function pushTransaction(action, data = {}) {
  try {
    const result = await api.transact({
      actions: [api.with(account).as(account)[action](...Object.values(data))],
    });
    console.log(result.processed.action_traces[0])
  } catch (error) {
    console.error(error);
  }
}

await pushTransaction('create', {id: 50, account, data: 'CREATE record push transaction'});
await pushTransaction('read', { id: 50 });
await pushTransaction('update', { id: 50, data: 'UPDATE record push transaction' });
await pushTransaction('destroy', { id: 50 });
