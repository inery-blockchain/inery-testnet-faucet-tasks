import { Api, JsonRpc, JsSignatureProvider } from "ineryjs";
import dotenv from "dotenv";
dotenv.config();

const url = "http://143.110.152.6:8888";

const json_rpc = new JsonRpc(url);
const account = "zarkow";
const actor = "zarkow";
const signature = new JsSignatureProvider([process.env.PRIVATE_KEY]);

const Userapi = new Api({
  rpc: json_rpc,
  signatureProvider: signature,
});

export { Userapi, account, actor };
