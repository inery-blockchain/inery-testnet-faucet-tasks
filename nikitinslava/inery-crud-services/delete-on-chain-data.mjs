import { INERY_ACCOUNT } from "../configServices/configuration.mjs";
import { IneryApiService, authorization, transactionBroadcastConfig } from "../ineryApiServices/inery-service.mjs";

async function deleteDataFromChain(id) {
    try {
        console.log('*********************on chain data destroy ******************')
        const destroyData = await IneryApiService.transact(
            {
                actions: [
                    {
                        account: INERY_ACCOUNT,
                        name: 'destroy',
                        authorization: authorization,
                        data: {
                            id
                        },
                    },
                ],
            },
            transactionBroadcastConfig
        );
        console.log(destroyData); // output after pushing transaction on chain
    } catch (error) {
        console.log(error); // catch error in case of occurs
    }
}

deleteDataFromChain(39);