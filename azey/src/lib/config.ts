import { Api, JsonRpc, JsSignatureProvider } from 'ineryjs/dist/index.js';

const url = 'http://vmi1064243.contaboserver.net:8888';

const json_rpc = new JsonRpc(url);
const private_key = '5KLBthkvdpjQVFoRP9rLd4FnTVxXnezvsStG1otbzX4wne73KjD';
export const actor = 'alter.serv1';

export const account = 'azey';
const signature = new JsSignatureProvider([private_key]);

export const api = new Api({
	rpc: json_rpc,
	signatureProvider: signature
});
