import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'ineryjs/dist/index.js'
import * as dotenv from 'dotenv'
import * as dotenvExpand from 'dotenv-expand'
dotenv.config()
dotenvExpand.expand(dotenv.config())

const account = process.env.TOKEN_ACCOUNT
const actor = process.env.USER_ACC_NAME
const symbol = process.env.SYMBOL
const amount = process.env.TRANSFER_AMOUNT
const memo = process.env.TRANSFER_MEMO

const json_rpc = new JsonRpc(process.env.INERY_NODE_RPC)
const signature  = new JsSignatureProvider([process.env.INERY_PRIV_KEY]);

const api = new Api({
    rpc: json_rpc,
    signatureProvider: signature
})

async function transferToken(from, to, quantity, memo){
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
                        from, to, quantity, memo
                    }
                }
            ]
        },{broadcast:true,sign:true})
	console.log("\x1b[1;7;92m")
        console.log("TRANSFER transaction details")
        console.log("\x1b[0m")
        console.log(tx.processed)
        console.log("\x1b[1;7;92m")
        console.log("RPC Push transaction action TRANSFER details")
        console.log("\x1b[0m")
        console.log(tx.processed.action_traces[0].act)
    }catch(error){
        console.log(error)
        console.log("\x1b[1;7;91m")
        console.log("ERROR : Can't TRANSFER token symbol", symbol)
        console.log("DETAILS :", error.details[0].message)
        console.log("\x1b[0m")
    }
}

transferToken(account, actor, amount, memo)
