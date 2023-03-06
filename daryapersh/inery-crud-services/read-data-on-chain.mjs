import { INERY_ACCOUNT } from "../configServices/configuration.mjs";
import { IneryApiService, authorization, transactionBroadcastConfig } from "../ineryApiServices/inery-service.mjs";

export async function readDataFromChain(id) {
    try {
        console.log('*********************on chain data read ******************')
        const readChainInfo = await IneryApiService.transact(
            {
                actions: [
                    {
                        account: INERY_ACCOUNT,
                        name: 'read',
                        authorization: authorization,
                        data: {
                            id
                        },
                    },
                ],
            },
            transactionBroadcastConfig
        );
        console.log(readChainInfo);

    } catch (error) {
        console.log(error); // catch error in case of occurs
    }
}

readDataFromChain(39)