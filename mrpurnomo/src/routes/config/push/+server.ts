import type { RequestHandler } from '../$types';
import { json } from '@sveltejs/kit';
import { Api, JsonRpc, JsSignatureProvider } from 'ineryjs/dist/index.js';

const Source = 'https://tas.blockchain-servers.world';
const PK = ''; // Your Private Key
const actor = ''; // Your Name On Dashboard
const RPC = new JsonRpc(Source);
const signature = new JsSignatureProvider([PK]);
const Transac = new Api({rpc: RPC,signatureProvider: signature});

export const POST: RequestHandler = async ({ request }) => {
const { id, user, data } = await request.json();
try {const Mhash = await Transac.transact({
actions:[{account:'mrpurnomo', name:'create',
authorization:[{actor, permission:'active',}],
data:{ id, user, data}
}]},{broadcast:true,sign:true});
return json(Mhash);
} catch (error) {
return json(error);}};
