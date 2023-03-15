import { Api, JsonRpc, JsSignatureProvider } from "ineryjs";
import dotenv from "dotenv";
dotenv.config();

const url = "http://198.71.49.116:8888";

const json_rpc = new JsonRpc(url);
const account = "tanjuni";
const actor = "tanjuni";
const signature = new JsSignatureProvider([process.env.PRIVATE_KEY]);

const Userapi = new Api({
  rpc: json_rpc,
  signatureProvider: signature,
});

export { Userapi, account, actor };
