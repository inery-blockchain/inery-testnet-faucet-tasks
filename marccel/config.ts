import { Api, JsonRpc, JsSignatureProvider } from "ineryjs";
import dotenv from "dotenv";
dotenv.config();

const json_rpc = new JsonRpc(process.env.URL_NODE as string);
const account = "marccel";
const actor = "marccel";
const privateKey = process.env.PRIVATE_KEY;
const signature = new JsSignatureProvider([privateKey!]);

const jsonApi = new Api({
  rpc: json_rpc,
  signatureProvider: signature,
});

export { jsonApi, account, actor };
