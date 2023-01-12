import { Api, JsonRpc, JsSignatureProvider } from 'eosjs';

const url = 'http://localhost:3000';
const rpc = new JsonRpc(url);
const privateKey = 'db9f32e6ea6537ed4f2f37ad5f5d702cdc166f807e7e8a6'; 
const signatureProvider = new JsSignatureProvider([privateKey]);

export const api = new Api({ rpc, signatureProvider });
export const account = 'azey';
