import { Api, JsonRpc, JsSignatureProvider } from "ineryjs";
import dotenv from "dotenv";
dotenv.config();

const url = "http://74.208.122.244:8888";

const json_rpc = new JsonRpc(url);
const account = "setanarab";
const actor = "setanarab";
const signature = new JsSignatureProvider([process.env.PRIVATE_KEY]);

const Userapi = new Api({
  rpc: json_rpc,
  signatureProvider: signature,
});

export { Userapi, account, actor };
