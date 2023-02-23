import { Api, JsonRpc, JsSignatureProvider } from 'ineryjs/dist/index.js';

const url = 'https://tas.blockchain-servers.world';

const json_rpc = new JsonRpc(url);
const private_key = 'xxxxxxxxxxxx'; // change with your private key
export const actor = 'ineryaccount'; // change with your inery account

export const account = 'ineryaccount'; // change with your inery account
const signature = new JsSignatureProvider([private_key]);

export const api = new Api({
	rpc: json_rpc,
	signatureProvider: signature
});
