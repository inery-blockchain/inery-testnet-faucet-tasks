import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { api, account, actor } from '$lib/config';

export const POST: RequestHandler = async ({ request }) => {
	const { id, uname, dep } = await request.json();
	try {
		const tx = await api.transact(
			{
				actions: [
					{
						account,
						name: 'update',
						authorization: [
							{
								actor,
								permission: 'active'
							}
						],
						data: {
							id, uname, dep
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
