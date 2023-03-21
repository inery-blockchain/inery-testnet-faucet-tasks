import { UserApi, INERY_ACCOUNT } from "./init.mjs";

// create new data
async function create(id, user, data) {
    try {
        // new transaction and sign it
        const trans = await UserApi.transact(
            {
                actions: [
                    {
                        account: user,
                        name: 'create',
                        authorization: [
                            {
                                actor: user,
                                permission: 'active',
                            },
                        ],
                        data: {
                            id,
                            user,
                            data,
                        },
                    },
                ],
            },
            { broadcast: true, sign: true }
        );

        console.log(trans); // output to terminal
    } catch (error) {
        console.log(error); // catch error
    }
}

// call RPC
create(3, INERY_ACCOUNT, 'Task4 RPC');