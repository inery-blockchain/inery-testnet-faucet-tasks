import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'ineryjs';

const url="https://157.245.249.221:8888";// node url or your address ip
const rpc = new JsonRpc(url);

const account = "jowo.wg" // account name on dashboard inery
const actor = "jowo.wg"
const PRIVATE_KEY = "Account_Private_Key"; // user1 private key
const signatureProvider = new JsSignatureProvider([user1PrivateKey]);

const api = new Api ({ rpc : json_rpc, signatureProvider: signature,  });


export { Userapi, account, actor };
