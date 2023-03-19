import { Api, JsonRpc, JsSignatureProvider } from 'ineryjs/dist/index.js';

const url = 'https://tas.blockchain-servers.world';

const json_rpc = new JsonRpc(url);
const private_key = 'please fill your Pk';
export const actor = 'username';

export const account = 'username';
const signature = new JsSignatureProvider([private_key]);

export const api = new Api({
	rpc: json_rpc,
	signatureProvider: signature
});
