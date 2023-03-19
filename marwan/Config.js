import { Api, JsonRpc, JsSignatureProvider } from "ineryjs";
import dotenv from "dotenv";
dotenv.config();

const url = "https://tas.blockchain-servers.world";

const json_rpc = new JsonRpc(url);
const account = "marwan";
const actor = "marwan";
const signature = new JsSignatureProvider([process.env.PRIVATE_KEY]);

const Userapi = new Api({
  rpc: json_rpc,
  signatureProvider: signature,
});

export { Userapi, account, actor };
