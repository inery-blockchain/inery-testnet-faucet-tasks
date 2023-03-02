import { Api, JsonRpc, JsSignatureProvider } from "ineryjs";

const actor = "amirmp";
const private_key = process.env.PRIVATE_KEY;
const signature = new JsSignatureProvider([private_key!]);
const node = "http://5.144.132.50:8888";
const json_rpc = new JsonRpc(node);


const pushapi = new Api({
  rpc: json_rpc,
  signatureProvider: signature,
});

export { actor, pushapi };
