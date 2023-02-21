import { INERY_ACCOUNT } from "../configServices/configuration.mjs";
import { IneryApiService, authorization, transactionBroadcastConfig } from "../ineryApiServices/inery-service.mjs";
export async function addData(id, user, data) {
    try {
        console.log('*********************adding data******************')
        const addTransaction = await IneryApiService.transact(
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
        console.log(addTransaction); // output after pushing transaction on chain
        return null;
    } catch (error) {
        console.log(error); // catch error in case of occurs
    }
}
