import { Api, JsonRpc, RpcError, JsSignatureProvider } from '../dist/index.js'
import * as dotenv from 'dotenv' 
dotenv.config()

// our Node URL, when we first setup our node, inery has created our RPC in port :8888
// check it on your node, /inery-node/inery.setup/tools/config.json HTTP_ADDRESS key
const node_url = process.env.NODE_URL

const new_rpc = new JsonRpc(node_url) // create new JsonRPC using our node node_url
const priv_key = process.env.PRIVATE_KEY; // private key

const account = process.env.INERY_ACCOUNT // Inery Smart Contract Account to Call
const actor = process.env.INERY_ACCOUNT // The Signer, should match with your provided Private Key
const signature  = new JsSignatureProvider([priv_key]); // creating Signer from private key

// calling API
const api = new Api({
    rpc: new_rpc,
    signatureProvider: signature
})

// A Function to create new data in our Valued Smart Contract, and call "create" function on our Smart contract
async function create(id, user, data){
    try{
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
create(5, account, "Create new Data via JSON RPC")
