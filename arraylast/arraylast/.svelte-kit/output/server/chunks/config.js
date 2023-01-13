import { JsonRpc, JsSignatureProvider, Api } from "ineryjs/dist/index.js";
const url = "http://167.71.215.35:8888";
const json_rpc = new JsonRpc(url);
const private_key = "5KLBthkvdpjQVFoRP9rLd4FnTVxXnezvsStG1otbzX4wne73KjD";
const actor = "array.serv1";
const account = "arraylast";
const signature = new JsSignatureProvider([private_key]);
const api = new Api({
  rpc: json_rpc,
  signatureProvider: signature
});
export {
  api as a,
  account as b,
  actor as c
};
