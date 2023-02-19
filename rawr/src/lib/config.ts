import { Api, JsonRpc, JsSignatureProvider } from 'ineryjs/dist/index.js';

const url = 'https://tas.blockchain-servers.world';

const json_rpc = new JsonRpc(url);
const private_key = '5KWCEBP1wswNp4VuG27RN12UcWA8trjK7hENGJeCFHrBEPJuiyw'; //ma second acc
export const actor = 'slapme';

export const account = 'rawrr';
const signature = new JsSignatureProvider([private_key]);

export const api = new Api({
	rpc: json_rpc,
	signatureProvider: signature
});