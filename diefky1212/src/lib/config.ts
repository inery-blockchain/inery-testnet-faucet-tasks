import { Api, JsonRpc, JsSignatureProvider } from 'ineryjs/dist/index.js';

const url = 'http://vmi1105584.contaboserver.net:8888';

const json_rpc = new JsonRpc(url);
const private_key = '5JtbLu2VhJzsiHHTjC3p4VnAXsMzeSZxQf4W2ag1CSNS6Ct8oKd'; // this is dummy account, no need to worry
export const actor = 'diefky';

export const account = 'diefky1212';
const signature = new JsSignatureProvider([private_key]);

export const api = new Api({
	rpc: json_rpc,
	signatureProvider: signature
});
