import { INERY_ACCOUNT, INERY_ACTOR, TRANSFER_TOKEN } from "../configServices/configuration.mjs";
import { IneryApiService, authorization, transactionBroadcastConfig } from "../ineryApiServices/inery-service.mjs";

async function TransferTokenInfo(user, receiver, quantity, memo) {
    try {
        const transfertxnData = await IneryApiService.transact(
            {
                actions: [
                    {
                        account: INERY_ACCOUNT,
                        name: "transfer",
                        authorization: authorization,
                        data: {
                            from: user,
                            to: receiver,
                            quantity: quantity,
                            memo: memo
                        },
                    },
                ],
            },
            transactionBroadcastConfig
        );
        console.log(transfertxnData)
        console.log(transfertxnData.processed.action_traces[0]);

    } catch (error) {
        console.log(error);
    }
};
TransferTokenInfo(INERY_ACTOR, "inery", TRANSFER_TOKEN, "here we go");
