import { Api, JsonRpc, JsSignatureProvider } from "ineryjs";
import { NODE_URL, INERY_ACCOUNT, PRIVATE_KEY } from "./config.mjs";


const json_rpc = new JsonRpc(NODE_URL);
const signature = new JsSignatureProvider([PRIVATE_KEY]);

const UserApi = new Api({
  rpc: json_rpc,
  signatureProvider: signature,
});

export { UserApi, INERY_ACCOUNT };
