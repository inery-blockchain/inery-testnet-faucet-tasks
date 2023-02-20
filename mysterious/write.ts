import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { api } from '$lib/config';

export const handleUpdate: RequestHandler = async ({ request }) => {
	try {
		const { identifier, payload } = await request.json();
		const tx = await api.transact({
			actions: [
				{
					account: 'mysterious',
					name: 'updateData',
					authorization: [
						{
							actor: 'mysterious',
							permission: 'active'
						}
					],
					data: {
						identifier,
						payload
					}
				}
			]
		}, { broadcast: true, sign: true });

		return json(tx);
	} catch (error) {
		return json(error);
	}
};