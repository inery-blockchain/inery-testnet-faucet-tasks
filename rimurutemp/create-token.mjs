import { Api, JsonRpc, RpcError, JsSignatureProvider } from "ineryjs/dist/index.js";
import * as dotenv from "dotenv";
dotenv.config();

const url = process.env.NODE_URL;
const json_rpc = new JsonRpc(url);
const private_key = process.env.PRIVATE_KEY;
const actor = process.env.INERY_ACCOUNT;
const signature  = new JsSignatureProvider([private_key]);
const api = new Api({ rpc: json_rpc, signatureProvider: signature })

async function createtoken(issuer, maximum_supply){
    try{
        // create new transaction and sign it
        const tx = await api.transact({
            actions:[
                {
                  account,
                  name:"createtoken",
                  authorization:[
                        {
                            actor,
                            permission:"active"
                        }
                    ],
                    data:{
                        issuer, maximum_supply
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

async function issue(to, quantity, memo){
    try{
        // create new transaction and sign it
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

        console.log(tx)
        console.log(tx.processed.action_traces[0].console)
    }catch(error){
        console.log(error)
    }
}

async function main(issuer, maximum_supply){
    await create(issuer, maximum_supply)
    await issue(to, quantity, memo)
}

main(actor, token, "CREATE TOKEN from JSON RPC")
