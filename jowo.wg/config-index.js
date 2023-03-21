import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'ineryjs';
import dotenv from "dotenv";
dotenv.config();

const url="https://157.245.249.221:8888";// input  your node ip on inery account
const rpc = new JsonRpc(url);

const account = "jowo.wg" // input your account name on inery account
const actor = "jowo.wg"
const PRIVATE_KEY = "Account_Private_Key"; // input your private key on inery account
const signatureProvider = new JsSignatureProvider([PRIVATE_KEY]);

const Userapi = new Api ({ rpc : json_rpc, signatureProvider: signature,  });


export { Userapi, account, actor };
