import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'ineryjs/dist/index.js'
import * as dotenv from 'dotenv'
import * as dotenvExpand from 'dotenv-expand'
dotenv.config()
dotenvExpand.expand(dotenv.config())

const account = process.env.TOKEN_ACC
const actor = process.env.ACC_NAME
const symbol = process.env.SYMBOL
const amount = process.env.ISSUE_AMOUNT
const memo = process.env.ISSUE_MEMO

const json_rpc = new JsonRpc(process.env.NODE_RPC)
const signature  = new JsSignatureProvider([process.env.PRIV_KEY]);

const api = new Api({
    rpc: json_rpc,
    signatureProvider: signature
})

async function issueToken(to, quantity, memo){
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
	console.log("\x1b[1;7;92m")
        console.log("ISSUE Token transaction details")
        console.log("\x1b[0m")
        console.log(tx.processed)
        console.log("\x1b[1;7;92m")
        console.log("RPC Push transaction action Issue Token details")
        console.log("\x1b[0m")
        console.log(tx.processed.action_traces[0].act)
    }catch(error){
        console.log(error)
        console.log("\x1b[1;7;91m")
        console.log("ERROR : Could not ISSUE token symbol", symbol)
        console.log("DETAILS :", error.details[0].message)
        console.log("\x1b[0m")
    }
}

issueToken(actor, amount, memo)
