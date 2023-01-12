import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { api } from '$lib/config';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { id } = await request.json();
		const tx = await api.transact({
				actions: [
					{
						account: 'azey',
						name: 'delete',
						authorization: [
							{
								actor: 'azey',
								permission: 'active'
							}
						],
						data: {
							id
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
