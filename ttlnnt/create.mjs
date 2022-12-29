import { Api, JsonRpc, RpcError, JsSignatureProvider } from './dist/index.js'
import * as dotenv from 'dotenv'
dotenv.config()

var api_id = process.argv[2];
var message = process.argv[3];

const url = process.env.NODE_URL

const json_rpc = new JsonRpc(url) // create new JsonRPC using our node url
const private_key = process.env.PRIVATE_KEY; // private key

const account = process.env.INERY_ACCOUNT // Inery Smart Contract Account to Call
const actor = process.env.INERY_ACCOUNT // The Signer, should match with your provided Private Key
const signature  = new JsSignatureProvider([private_key]); // creating Signer from private key

const api = new Api({
    rpc: json_rpc,
    signatureProvider: signature
})

async function create(id, user, data){
    try{
        // create new transaction and sign it
        const tx = await api.transact({
            actions:[
                {
                    account,
                    name:"create",
                    authorization:[
                        {
                            actor,
                            permission:"active"
                        }
                    ],
                    data:{
                        id, user, data
                    }
                }
            ]
        },{broadcast:true,sign:true})

        console.log(tx) // output the tx to terminal, it's Json Object
        console.log(tx.processed.action_traces[0].console)
    }catch(error){
        console.log(error)
    }
}

// call RPC that we created in create function
create(api_id, account, message)
