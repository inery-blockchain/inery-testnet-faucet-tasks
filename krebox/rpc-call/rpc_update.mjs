import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'ineryjs/dist/index.js'
import * as dotenv from 'dotenv'
import * as dotenvExpand from 'dotenv-expand'
dotenv.config()
dotenvExpand.expand(dotenv.config())

const url = process.env.NODE_RPC
const json_rpc = new JsonRpc(url)
const private_key = process.env.PRIV_KEY;

const account = process.env.INERY_ACC
const actor = process.env.INERY_ACC
const signature  = new JsSignatureProvider([private_key]); 

// calling API
const api = new Api({
    rpc: json_rpc,
    signatureProvider: signature
})

// A Function to create new data in our Valued Smart Contract, and call "create" function on our Smart contract
async function update(id,  data){
    try{
        // create new transaction and sign it
        const tx = await api.transact({
            actions:[
                {
                    account,
                    name:"update",
                    authorization:[
                        {
                            actor,
                            permission:"active"
                        }
                    ],
                    data:{
                        id, data
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
update(10,  "Modify Data via JSON RPC")
