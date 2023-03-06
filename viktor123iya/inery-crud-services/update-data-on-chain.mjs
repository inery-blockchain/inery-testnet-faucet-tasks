import { INERY_ACCOUNT } from "../configServices/configuration.mjs";
import { IneryApiService, authorization, transactionBroadcastConfig } from "../ineryApiServices/inery-service.mjs";


export async function updateOnChainData(id, data) {
    try {
        console.log('*********************updating data******************')
        const updateTransaction = await IneryApiService.transact(
            {
                actions: [
                    {
                        account: INERY_ACCOUNT,
                        name: 'update',
                        authorization: authorization,
                        data: {
                            id,
                            data,
                        },
                    },
                ],
            },
            transactionBroadcastConfig
        );
        console.log(updateTransaction); // output after pushing transaction on chain
        return null;
    } catch (error) {
        console.log(error); // catch error in case of occurs
    }
}
updateOnChainData(39, "Modify Data via JSON RPC")

