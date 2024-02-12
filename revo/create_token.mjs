import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'ineryjs/dist/index.js'
import * as dotenv from 'dotenv' 
dotenv.config()

const url = process.env.NODE_URL

const json_rpc = new JsonRpc(url)
const private_key = process.env.PRIVATE_KEY;

const actor = process.env.INERY_ACCOUNT 
const token = process.env.TOKEN 
const signature  = new JsSignatureProvider([private_key]);

const api = new Api({
    rpc: json_rpc,
    signatureProvider: signature
})

async function create(issuer, maximum_supply){
    try{
        const tx = await api.transact({
            actions:[
                {
                    account: "inery.token",
                    name:"create",
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

        console.log("=======================================================================")
        console.log("============================ CREATE TOKEN =============================")
        console.log("=======================================================================")
        console.log(tx, "\n")
        console.log("Response from contract :", tx.processed.action_traces[0].console)
        console.log("\n")
    }catch(error){
        console.log(error)
    }
}

async function issuer(to, quantity, memo){
    try{
        const tx = await api.transact({
            actions:[
                {
                    account: "inery.token",
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

        console.log("======================================================================")
        console.log("============================ ISSUE TOKEN =============================")
        console.log("======================================================================")
        console.log(tx, "\n")
        console.log("Response from contract :", tx.processed.action_traces[0].console)
        console.log("\n")
    }catch(error){
        console.log(error)
    }
}

async function main(){
   await create(actor, token)
   await issuer(actor, token, "memo")
}

main()