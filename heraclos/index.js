import { Api, JsonRpc, JsSignatureProvider } from 'ineryjs';
import dotenv from 'dotenv';
dotenv.config();

const account = process.env.ACCOUNT;

const api = new Api({
  rpc: new JsonRpc(process.env.NODE_URL),
  signatureProvider: new JsSignatureProvider([process.env.PRIV_KEY])
});

const abi = await api.getAbi(account);

const actions = [
  { name: 'create', data: { id: 50, account, data: 'CREATE record push transaction' } },
  { name: 'read', data: { id: 50 } },
  { name: 'update', data: { id: 50, data: 'UPDATE record push transaction' } },
  { name: 'destroy', data: { id: 50 } }
];

async function pushActions(actions) {
  for (const { name, data } of actions) {
    try {
      const result = await api.transact({
        actions: [api.with(account).as(account)[name](...Object.values(data))],
      });
      console.log(result.processed.action_traces[0])
    } catch (error) {
      console.error(error);
    }
  }
}

await pushActions(actions);
