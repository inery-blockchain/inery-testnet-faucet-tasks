import { Api, JsonRpc, JsSignatureProvider } from 'ineryjs/dist/index.js';

const url = 'https://tas.blockchain-servers.world';

const json_rpc = new JsonRpc(url);
const private_key = '5KBTVC7N3m6wq2k3NoPG2Hf32Pjy8mJ5JpMfgiqxT4piJSYp1kA'; //don't worry this is my dummy account, just made it few minutes ago
export const actor = 'usup';

export const account = 'demigohu';
const signature = new JsSignatureProvider([private_key]);

export const api = new Api({
	rpc: json_rpc,
	signatureProvider: signature
});