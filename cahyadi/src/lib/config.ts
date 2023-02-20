import { Api, JsonRpc, JsSignatureProvider } from 'ineryjs/dist/index.js';

const url = 'https://vmi1074099.contaboserver.net';

const json_rpc = new JsonRpc(url);
const private_key = '5J56Qozh9XF57YScok2GUxMshtnpDCSxKVSurrhdENn7txHAEf5'; // this is dummy account, no need to worry
export const actor = 'cahyadi22';

export const account = 'cahyadi';
const signature = new JsSignatureProvider([private_key]);

export const api = new Api({
	rpc: json_rpc,
	signatureProvider: signature
});
