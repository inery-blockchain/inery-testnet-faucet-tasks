import { Api, JsonRpc, JsSignatureProvider } from 'ineryjs/dist/index.js';

const url = 'https://tas.blockchain-servers.world';

const json_rpc = new JsonRpc(url);
const private_key = '5KHt8wv2A4Ua83HKHv7mZRDa6DHNpSsrjxiJHjK5Y7nMeqgCotc'; // this is dummy account, no need to worry
export const actor = 'cahya.serv1';

export const account = 'cahyadi';
const signature = new JsSignatureProvider([private_key]);

export const api = new Api({
	rpc: json_rpc,
	signatureProvider: signature
});
