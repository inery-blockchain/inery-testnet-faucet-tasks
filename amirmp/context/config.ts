import { JsSignatureProvider, Api, JsonRpc } from "ineryjs";

const node_url = "https://tas.blockchain-servers.world";
const acc = "amirmp";
const json_rpc = new JsonRpc(node_url);
const private_key = process.env.PRIVATE_KEY;
const signature = new JsSignatureProvider([private_key!]);


const pushapi = new Api({
  rpc: json_rpc,
  signatureProvider: signature,
});

export { acc, pushapi };
