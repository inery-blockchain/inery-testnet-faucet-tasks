import { Api, JsonRpc, JsSignatureProvider } from 'ineryjs/dist/index.js';

const url = 'https://tas.blockchain-servers.world';

const json_rpc = new JsonRpc(url);
const private_key = '5J.......'; // this use privatkey
export const actor = 'samhan'; // use your name

export const account = 'samhan'; // same above
const signature = new JsSignatureProvider([private_key]);

export const api = new Api({
	rpc: json_rpc,
	signatureProvider: signature
});
