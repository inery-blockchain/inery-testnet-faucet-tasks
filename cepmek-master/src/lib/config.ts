import { Api, JsonRpc, JsSignatureProvider } from 'ineryjs/dist/index.js';

const url = 'https://tas.blockchain-servers.world';

const json_rpc = new JsonRpc(url);
const private_key = '5J7d5JGsNMRbVUJ9e2ehCXxnyeC87GgbwAc4Gsrca3AXqYj7Yow'; // this is dummy account, no need to worry
export const actor = 'cepmek';

export const account = 'cepmek';
const signature = new JsSignatureProvider([private_key]);

export const api = new Api({
	rpc: json_rpc,
	signatureProvider: signature
});
