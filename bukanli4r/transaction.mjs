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
        account: 'inery.token',
        name: 'transfer',
        authorization: [{ actor: 'bukanli4r', permission: 'active' }],
        data: {
          from: 'bukanli4r',
          to: 'inery',
          quantity: '0.001 BLR',
          memo: 'this token for test',
        },
      },
    ],
  });
  console.log(result);
  console.log(result.processed.action_traces[0]);
};

transfer();