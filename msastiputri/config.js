import { Api, JsonRpc, JsSignatureProvider } from 'ineryjs';
import dotenv from 'dotenv';

dotenv.config();
const url = 'http://185.215.166.16:8888';
const account = 'msastiputri';
const actor = 'msastiputri';
const privateKey = process.env.PRIVATE_KEY;

const jsonRpc = new JsonRpc(url);
const signatureProvider = new JsSignatureProvider([privateKey]);
const Userapi = new Api({ rpc: jsonRpc, signatureProvider });

export { Userapi, account, actor };

