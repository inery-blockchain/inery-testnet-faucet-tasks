import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { api } from '$lib/config';

export const deleteItem: RequestHandler = async ({ request }) => {
  try {
    const { id } = await request.json();
    const tx = await api.transact({
        actions: [
          {
            account: 'mysterious',
            name: 'remove',
            authorization: [
              {
                actor: 'mysterious',
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