import type { RequestHandler } from '../$types';
import { json } from '@sveltejs/kit';
import { Api, JsonRpc, JsSignatureProvider } from 'ineryjs/dist/index.js';

// need setup first before testing 
const node_url = 'https://tas.blockchain-servers.world'; // dont change this
const private_key = ''; // need your private key
const actor = ''; // name inery account
const account = actor
const name = 'destroy';
const permission = 'active';
const URL = new JsonRpc(node_url);
const signature_key = new JsSignatureProvider([private_key]);
const Proccess = new Api({rpc: URL,signatureProvider: signature_key});

export const POST: RequestHandler = async ({ request }) => {
const { id} = await request.json();
try {const Mhash = await Proccess.transact({actions:[{account, name,authorization:[{actor, permission,}],data:{ id}}]},
{broadcast:true,sign:true});return json(Mhash);} catch (error) {return json(error);}};