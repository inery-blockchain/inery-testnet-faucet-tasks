import { Api, JsonRpc, JsSignatureProvider } from 'ineryjs/dist/index.js';

const url = 'http://IP:8888';

const json_rpc = new JsonRpc(url);
const private_key = 'Private_key';
export const actor = 'inery_account';

export const account = 'inery_account';
const signature = new JsSignatureProvider([private_key]);

export const api = new Api({
	rpc: json_rpc,
	signatureProvider: signature
});
