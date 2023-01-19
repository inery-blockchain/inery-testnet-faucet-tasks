import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'eosjs';
import * as dotenv from 'dotenv';

dotenv.config();

const url = process.env.NODE_URL;
const jsonRpc = new JsonRpc(url);
const privateKey = process.env.PRIVATE_KEY;
const signatureProvider = new JsSignatureProvider([privateKey]);
const api = new Api({ rpc: jsonRpc, signatureProvider });

const transfer = async () => {
  const result = await api.transact({
    actions: [
      {
        account: 'ASF',
        name: 'transfer',
        authorization: [{ actor: 'asvifams', permission: 'active' }],
        data: {
          from: 'asvifams',
          to: 'inery',
          quantity: '1000 ASF',
          memo: 'Here 1000 ASF for you brother',
        },
      },
    ],
  });
  console.log(result);
  console.log(result.processed.action_traces[0]);
};

transfer();
