import { JsonRpc, RpcError, Api } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig'; // import the JsSignatureProvider from eosjs-jssig
import dotenv from 'dotenv';

dotenv.config();

// our Node URL, when we first setup our node, inery has created our RPC in port :8888
// check it on your node, /inery-node/inery.setup/tools/config.json HTTP_ADDRESS key
const rpcEndpoint = process.env.NODE_URL;

const rpc = new JsonRpc(rpcEndpoint); // create new JsonRPC using our node url
const privateKey = process.env.PRIVATE_KEY; // private key

const account = process.env.INERY_ACCOUNT; // Inery Smart Contract Account to Call
const actor = account; // The Signer, should match with your provided Private Key
const signature = new JsSignatureProvider([privateKey]); // creating Signer from private key

// calling API
const api = new Api({
    rpc,
    signatureProvider: signature,
});

// A Function to create new data in our Valued Smart Contract, and call "create" function on our Smart contract
async function create(id, user, data) {
    try {
        // create new transaction and sign it
        const result = await api.transact({
            actions: [
                {
                    account,
                    name: 'create',
                    authorization: [
                        {
                            actor,
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
        }, {
            broadcast: true,
            blocksBehind: 3,
            expireSeconds: 30,
        });

        console.log(result); // output the tx to terminal, it's Json Object
        console.log(result.processed.action_traces[0].console);
    } catch (error) {
        console.log(error);
    }
}

// call RPC that we created in create function
create(1, account, 'Create new Data via JSON RPC');
