import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'ineryjs/dist/index.js'
import * as dotenv from 'dotenv' 

dotenv.config()

const json_rpc = new JsonRpc(url)
const signature = new JsSignatureProvider([private_key]);
const PKEY =  process.env.PRIVATE_KEY;
const ACC =  process.env.ACCOUNT_NAME;
const TOKEN =  process.env.TOKEN;
const SYMBOL = process.env.SYMBOL;
const AMOUNT = process.env.AMOUNT;
const MEMO =  process.env.MEMO;
const api = new Api({
  rpc: json_rpc,
  signatureProvider: signature
})


async function SendToken(to) {
  try {
    const result = await api.transact({
      actions: [{
        account: 'inery.token',
        name: 'transfer',
        authorization: [{
          actor: actor,
          permission: 'active',
        }],
        data: {
          from: wardy,
          to: Inery,
          amount: '200' + token 'NINE BALL',
          memo: 'test send 200 NBL tokens',
        }
      }]
    });

    console.log(result);
  } catch (error) {
    console.log(error)
  }
}

sendToken ( ) ;
