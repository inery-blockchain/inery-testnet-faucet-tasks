import { Api, JsonRpc, JsSignatureProvider } from "ineryjs";

const url = process.env.REACT_APP_URL_DATA as any;

const json_rpc = new JsonRpc(url);
const private_key = process.env.REACT_APP_PRIVATE_KEY; // import private key from .env file;

const account = "nyeka";
const actor = "nyeka";
const signature = new JsSignatureProvider([private_key] as any);

const api = new Api({
  rpc: json_rpc,
  signatureProvider: signature,
});

export { api, account, actor };
