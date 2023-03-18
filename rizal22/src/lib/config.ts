import { Api, JsonRpc, JsSignatureProvider } from 'ineryjs/dist/index.js';

const url = 'http://178.128.95.30:8888';

const json_rpc = new JsonRpc(url);
const private_key = 'privatekey your';
export const actor = 'rizal.serv1';

export const account = 'rizal22';
const signature = new JsSignatureProvider([private_key]);

export const api = new Api({
	rpc: json_rpc,
	signatureProvider: signature
});
