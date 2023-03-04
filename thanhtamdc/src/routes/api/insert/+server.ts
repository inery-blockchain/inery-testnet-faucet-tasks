import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { api, account, actor } from '$lib/config';

export const POST: RequestHandler = async ({ request }) => {
	const { id, user, stuid, stuname, ststate, marks } = await request.json();
	try {
		const tx = await api.transact(
			{
				actions: [
					{
						account,
						name: 'insert',
						authorization: [
							{
								actor, permission: 'active'
							}
						],
						data: {
							id, user, stuid, stuname, ststate, marks
						}
					}
				]
			},
			{ broadcast: true, sign: true }
		);
		return json(tx);
	} catch (error) {
		return json(error);
	}
};
