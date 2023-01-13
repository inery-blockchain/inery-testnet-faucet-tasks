import { Api, JsonRpc, JsSignatureProvider } from 'eosjs';
import * as dotenv from 'dotenv';

dotenv.config();

const url = process.env.NODE_URL;
const jsonRpc = new JsonRpc(url);
const privateKey = process.env.PRIVATE_KEY;
const account = process.env.INERY_ACCOUNT;
const actor = process.env.INERY_ACCOUNT;
const signatureProvider = new JsSignatureProvider([privateKey]);
const api = new Api({ rpc: jsonRpc, signatureProvider });

async function create(id, user, data) {
  try {
    const tx = await api.transact({
      actions: [
        {
          account,
          name: 'create',
          authorization: [{ actor, permission: 'active' }],
          data: { id, user, data },
        },
      ],
    }, { broadcast: true, sign: true });

    console.log(tx);
    console.log(tx.processed.action_traces[0].console);
  } catch (error) {
    console.log(error);
  }
}

create(5, account, 'Create new Data via JSON RPC');
