import { Api, JsonRpc, JsSignatureProvider } from 'ineryjs';
import dotenv from 'dotenv';
dotenv.config();

const account = process.env.ACCOUNT;

const api = new Api({
  rpc: new JsonRpc(process.env.NODE_URL),
  signatureProvider: new JsSignatureProvider([process.env.PRIV_KEY])
});

const abi = await api.getAbi(account)

async function penTrans (action, data = {}) {
  try {
    const result = await api.transact({
      actions: [api.with(account).as(account)[action](...Object.values(data))],
    });
    console.log(result.processed.action_traces[0])
  } catch (error) {
    console.error(error);
  }
}

await penTrans
('create', {id: 77, account, data: 'CREATE record push transaction'});


await penTrans 
('read', { id: 77 });


await penTrans 
('update', { id: 77, data: 'UPDATE record push transaction' });

await penTrans
('destroy', { id: 77 });
