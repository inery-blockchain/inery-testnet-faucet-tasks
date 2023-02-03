import { Api } from "../node_modules/ineryjs/dist/ineryjs-api.js";
import { JsonRpc } from "ineryjs/dist/ineryjs-jsonrpc.js";
import { JsSignatureProvider } from "ineryjs/dist/ineryjs-jssig.js";
import dotenv from "dotenv";
dotenv.config();

export function signatureController() {
  const private_key = `${process.env.PRIVATE_KEY}`;
  const signature = new JsSignatureProvider([private_key]);
  return signature;
}
// function to get rpc and signature
export function ineryApiController() {
  const url = "http://143.198.159.250:8888";
  const json_rpc = new JsonRpc(url);
  const api = new Api({
    rpc: json_rpc,
    signatureProvider: signatureController(),
  });
  return api;
}
