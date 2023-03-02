import { Api, JsonRpc, JsSignatureProvider } from "ineryjs";


const private_key = process.env.PRIVATE_KEY;
const signature = new JsSignatureProvider([private_key!]);
const actor = "amirmp";
const URL_NODE = process.env.URL_NODE;
const json_rpc = new JsonRpc(URL_NODE);


const pushapi = new Api({
  rpc: json_rpc,
  signatureProvider: signature,
});

export { actor, pushapi };
