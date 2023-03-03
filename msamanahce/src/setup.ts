import { Api, JsonRpc, JsSignatureProvider } from 'ineryjs/dist/index.js';

const node_url = 'https://tas.blockchain-servers.world'; // Dont Change This
const URL = new JsonRpc(node_url);
const private_key = ''; // Add Your Private Key
const signature = new JsSignatureProvider([private_key]);
export const actor = ''; // Use name same on inery account
export const account = actor
export const Proccess = new Api({rpc: URL,signatureProvider: signature});






