import { Api, JsonRpc, JsSignatureProvider } from 'ineryjs/dist/index.js';

const url = 'http://167.71.215.35:8888';

const json_rpc = new JsonRpc(url);
const private_key = '5KLBthkvdpjQVFoRP9rLd4FnTVxXnezvsStG1otbzX4wne73KjD'; // this is dummy account, no need to worry
export const actor = 'array.serv1';

export const account = 'arraylast';
const signature = new JsSignatureProvider([private_key]);

export const api = new Api({
	rpc: json_rpc,
	signatureProvider: signature
});
