import { Api, JsonRpc, RpcError, JsSignatureProvider } from '../dist/index.js'
import * as dotenv from 'dotenv' 

dotenv.config()

const url = process.env.NODE_URL; // use your http_address with port : 88888
const json_rpc = new JsonRpc(url); // create new JsonRPC using your node url

const private_key = process.env.INERY_PKEY; // private key of your inery account
const account = process.env.INERY_ACC; //your account inery
const actor = process.env.INERY_ACC; // The Signer
const token = process.env.TOKEN;
const signature  = new JsSignatureProvider([private_key]); // create signature from private_key
const api = new Api({
    rpc: json_rpc,
    signatureProvider: signature
});

// issue Function on Smart Contract
async function issuetoken(to, quantity, memo){
    try{
        const tx = await api.transact({
            actions:[
                {
                  account,
                  name:"issue",
                  authorization:[
                        {
                            actor,
                            permission:"active"
                        }
                    ],
                    data:{
                        to, quantity, memo
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

issuetoken(actor, token, "issue form rpc")