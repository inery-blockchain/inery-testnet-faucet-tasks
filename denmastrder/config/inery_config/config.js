import { Api, JsonRpc, JsSignatureProvider } from "ineryjs";
import dotenv from "dotenv";
dotenv.config();

const url = "http://194.233.81.117:8888"; // the ip address you are using

const json_rpc = new JsonRpc(url);
const account = "denmastrder"; // inery account name
const actor = "denmastrder";
const signature = new JsSignatureProvider([process.env.PRIVATE_KEY]);

const Userapi = new Api({
  rpc: json_rpc,
  signatureProvider: signature,
});

export { Userapi, account, actor };