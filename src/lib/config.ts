import { Api, JsonRpc, JsSignatureProvider } from 'ineryjs/dist/index.js';

const url = 'https://tas.blockchain-servers.world';

const json_rpc = new JsonRpc(url);
const private_key = '5JT25ui79CLhBr8MutEwLTgxyAR2vPmXx2yahHSjBDYCnmNUKpk'; // this is my second account, just made it few minutes ago
export const actor = 'fiorentina';

export const account = 'cepmek';
const signature = new JsSignatureProvider([private_key]);

export const api = new Api({
	rpc: json_rpc,
	signatureProvider: signature
});
