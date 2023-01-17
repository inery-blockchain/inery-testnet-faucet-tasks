import { Api, JsonRpc, JsSignatureProvider } from "ineryjs";
import dotenv from "dotenv";
dotenv.config();

const url = "http://143.198.122.123:8888"; // your ip addres

const json_rpc = new JsonRpc(url);
const account = "kribolista"; //your inery account name
const actor = "kribolista";
const signature = new JsSignatureProvider([process.env.PRIVATE_KEY]);

const Userapi = new Api({
  rpc: json_rpc,
  signatureProvider: signature,
});

export { Userapi, account, actor };
