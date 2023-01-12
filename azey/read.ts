import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { api } from '$lib/config';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const { id } = await request.json();
        const tx = await api.rpc.get_transaction({id});
        return json(tx);
    } catch (error) {
        return json(error);
    }
};
