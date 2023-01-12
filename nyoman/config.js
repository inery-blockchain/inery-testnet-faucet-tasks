import { Api, JsonRpc, JsSignatureProvider } from "ineryjs";
import dotenv from "dotenv";
dotenv.config();

const json_rpc = new JsonRpc(process.env.URL_NODE);
const account = "nyoman";
const token = process.env.TOKEN_INERY;
const actor = "nyoman";
const privateKey = process.env.PRIVATE_KEY;
const signature = new JsSignatureProvider([privateKey]);

const transactApi = new Api({
  rpc: json_rpc,
  signatureProvider: signature,
});

export { transactApi, account, actor, token };
