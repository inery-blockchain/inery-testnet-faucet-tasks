const { Api, JsonRpc, JsSignatureProvider, RpcError } = require("ineryjs");
const { TextEncoder, TextDecoder } = require("util");
const fetch = require("node-fetch");
const { inery_node } = require("./config");

const rpc = new JsonRpc(inery_node.url, { fetch });
const signatureProvider = new JsSignatureProvider([inery_node.private_key]);
const api = new Api({
  rpc,
  signatureProvider,
  textDecoder: new TextDecoder(),
  textEncoder: new TextEncoder()
});

module.exports = {
  api,
  rpc,
  signatureProvider,
  TextEncoder,
  TextDecoder
};