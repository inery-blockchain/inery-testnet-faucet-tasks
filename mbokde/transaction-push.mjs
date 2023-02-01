import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'ineryjs';
import * as dotenv from 'dotenv';

// init configuration
dotenv.config();

// get config value
const url = process.env.NODE_URL;
const private_key = process.env.PRIVATE_KEY;
const account = process.env.INERY_ACCOUNT;
const actor = process.env.INERY_ACCOUNT;

const json_rpc = new JsonRpc(url); // create new JsonRPC using our node url

const signature = new JsSignatureProvider([private_key]); // creating Signer from private key

// calling API
const api = new Api({
    rpc: json_rpc,
    signatureProvider: signature,
});

// create new data (smart contract)
async function create(id, user, data) {
    try {
        // create new transaction and sign it
        const trans = await api.transact(
            {
                actions: [
                    {
                        account: account,
                        name: 'create',
                        authorization: [
                            {
                                actor: actor,
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

        console.log(trans); // output to terminal (Json object)
    } catch (error) {
        console.log(error); // output error if any
    }
}

// call RPC that we created in create function
create(1, account, 'Task4');