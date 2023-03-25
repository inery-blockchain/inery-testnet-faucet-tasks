import { INERY_ACCOUNT } from "./configuration.mjs";
import { IneryApiService, authorization, transactionBroadcastConfig } from "./inery-service.mjs";

// push data on inery block chain
async function pushOnChainData(id, user, data) {
    try {
        console.log('*********************pushing data******************')
        const pushTransaction = await IneryApiService.transact(
            {
                actions: [
                    {
                        account: INERY_ACCOUNT,
                        name: 'create',
                        authorization: authorization,
                        data: {
                            id,
                            user,
                            data,
                        },
                    },
                ],
            },
            transactionBroadcastConfig
        );
        console.log(pushTransaction); // output after pushing transaction on chain
    } catch (error) {
        console.log(error); // catch error in case of occurs
    }
}
// call RPC use unique id if get error for already exists
pushOnChainData(36, INERY_ACCOUNT, 'Push data through rpc call');