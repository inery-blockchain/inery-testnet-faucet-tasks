import { Api, JsonRpc, JsSignatureProvider } from "ineryjs";

const json_rpc = new JsonRpc(process.env.NEXT_PUBLIC_NODE_RPC_IP);
const private_key = `${process.env.NEXT_PUBLIC_INERY_PRIVATE_KEY}`;

const signature = new JsSignatureProvider([private_key]);

const getIneryApi = () => {
  const api = new Api({
    rpc: json_rpc,
    signatureProvider: signature,
  });
  return api;
};
export default getIneryApi; //get object of inery api
