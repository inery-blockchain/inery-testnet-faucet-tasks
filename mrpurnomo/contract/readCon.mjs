import { Api, JsonRpc, JsSignatureProvider } from 'ineryjs/dist/index.js'
import * as dotenv from 'dotenv' 
dotenv.config()

const url = process.env.NODE_URL

const json_rpc = new JsonRpc(url)
const private_key = process.env.PRIVATE_KEY;

const account = process.env.INERY_ACCOUNT
const actor = process.env.INERY_ACCOUNT
const signature  = new JsSignatureProvider([private_key]);

// calling
const api = new Api({
    rpc: json_rpc,
    signatureProvider: signature
})

// A Function to read data in our Valued Smart Contract, and call "readCon" function on our Smart contract
async function read(id){
    try{
        const tx = await api.transact({
            actions:[
                {
                  account,
                  name:"readCon", 
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

        console.log(tx) 
        console.log(tx.processed.action_traces[0].console)
    }catch(error){
        console.log(error)
    }
}

// calling RPC that we created in create function
read(1)