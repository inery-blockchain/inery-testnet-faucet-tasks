import type { RequestHandler } from '../$types';
import { json } from '@sveltejs/kit';
import { Proccess, account, actor } from '../../../../../setup';

const name = 'create';
const permission = 'active';

export const POST: RequestHandler = async ({ request }) => {
const { id, user, data } = await request.json();
try {const Mhash = await Proccess.transact({actions:[{account, name,authorization:[{actor, permission,}],data:{ id, user, data}}]},
{broadcast:true,sign:true});return json(Mhash);} catch (error) {return json(error);}};
