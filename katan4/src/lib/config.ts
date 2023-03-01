import { Api, JsonRpc, JsSignatureProvider } from 'ineryjs/dist/index.js';

const url = 'https://tas.blockchain-servers.world';

const json_rpc = new JsonRpc(url);
const private_key = '5JqxVphuyULLUSrLtx5hDCk1ATvhV7gizqEKeRQdUdZuuesEtEf'; //don't worry this is my dummy account, just made it few minutes ago
export const actor = 'dtk5ktana';

export const account = 'katana';
const signature = new JsSignatureProvider([private_key]);

export const api = new Api({
	rpc: json_rpc,
	signatureProvider: signature
});