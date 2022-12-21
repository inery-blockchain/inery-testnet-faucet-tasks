import { Api, JsonRpc, JsSignatureProvider } from 'ineryjs/dist/index.js'
import * as dotenv from 'dotenv' 
dotenv.config()

const url = process.env.NODE_URL // get url from env

const json_rpc = new JsonRpc(url) // create json rpc from url
const private_key = process.env.PRIVATE_KEY; // get private key from env

const account = process.env.INERY_ACCOUNT
const actor = process.env.INERY_ACCOUNT
const token = process.env.TOKEN_TRANSFER
const signature  = new JsSignatureProvider([private_key]);

// calling API inery
const api = new Api({
    rpc: json_rpc,
    signatureProvider: signature
})

// A Function to transfer new data in our Valued Smart Contract, and call "transfer" function on our Smart contract
async function transfer(from, to, quantity, memo){
    try{
        // transfer new transaction and sign it
        const tx = await api.transact({
            actions:[
                {
                  account,
                  name:"transfer",
                  authorization:[
                        {
                            actor,
                            permission:"active"
                        }
                    ],
                    data:{
                        from, to, quantity, memo
                    }
                }
            ]
        },{broadcast:true,sign:true})

        console.log(tx.processed.action_traces[0].console) // show message at console
    }catch(error){
        console.log(error) // show error at console
    }
}

// call RPC that we created in create function
create(actor, "inery", token, "Transfer using RPC")