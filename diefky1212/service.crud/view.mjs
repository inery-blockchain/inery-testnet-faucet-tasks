import { Api, JsonRpc, JsSignatureProvider } from '../dist/index.js'
import * as dotenv from 'dotenv' 
dotenv.config()

const url = process.env.NODE_URL

const json_rpc = new JsonRpc(url)
const private_key = process.env.PRIVATE_KEY;

const account = process.env.INERY_ACCOUNT
const actor = process.env.INERY_ACCOUNT
const signature  = new JsSignatureProvider([private_key]);

// calling API
const api = new Api({
    rpc: json_rpc,
    signatureProvider: signature
})

// A Function to view data in our Valued Smart Contract, and call "dbview" function on our Smart contract
async function view(id){
    try{
        // view transaction and sign it
        const tx = await api.transact({
            actions:[
                {
                  account,
                  name:"dbview", // check your name function at contact for view
                  authorization:[
                        {
                            actor,
                            permission:"active"
                        }
                    ],
                    data:{
                        id
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

// call RPC that we created in view function
view(1, actor,"view data from rpc")