import { Api, JsonRpc, JsSignatureProvider } from "ineryjs";
import dotenv from "dotenv";
dotenv.config();

const json_rpc = new JsonRpc(process.env.URL_NODE);
const account = "mixagrib";
const token = process.env.TOKEN_INERY;
const actor = "mixagrib";
const privateKey = process.env.PRIVATE_KEY;
const signature = new JsSignatureProvider([privateKey]);

const transactApi = new Api({
  rpc: json_rpc,
  signatureProvider: signature,
});

export { transactApi, account, actor, token };
