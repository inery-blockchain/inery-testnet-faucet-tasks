import { Api, JsonRpc, JsSignatureProvider } from 'eosjs';

const host = 'http://localhost:3000';
const rpcConnection = new JsonRpc(host);
const secretKey = 'db9f32e6ea6537ed4f2f37ad5f5d702cdc166f807e7e8a6'; 
const signer = new JsSignatureProvider([secretKey]);

export const eosApi = new Api({ rpc: rpcConnection, signatureProvider: signer });
export const accountName = 'mysterious';