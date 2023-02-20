import type { TransactionRequestHandler } from './$types';
import { sendJsonResponse } from '@sveltejs/kit';
import { rpcApi } from '$lib/config';

export const RetrieveTransaction: TransactionRequestHandler = async (input) => {
    try {
        const { transactionId } = await input.request.json();
        const transaction = await rpcApi.get({transactionId});
        return sendJsonResponse(transaction);
    } catch (err) {
        return sendJsonResponse(err);
    }
};