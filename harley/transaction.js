import { Api, JsonRpc, JsSignatureProvider } from 'ineryjs';
import dotenv from 'dotenv';

dotenv.config();

const signatureProvider = new JsSignatureProvider([process.env.PRIV_KEY]);
const rpc = new JsonRpc(process.env.NODE_URL);
const api = new Api({ rpc, signatureProvider });
const account = process.env.ACCOUNT;
const id = 1000;
const data = "INERY JSON-RPC CRUD push transaction";
