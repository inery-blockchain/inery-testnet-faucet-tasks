import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'ineryjs/dist/index.js'
import * as dotenv from 'dotenv'
dotenv.config()

const account = process.env.ACC_NAME
const actor = account
const id = process.env.DATA_VAL

const json_rpc = new JsonRpc(process.env.NODE_RPC)
const signature  = new JsSignatureProvider([process.env.PRIV_KEY]);

const api = new Api({
    rpc: json_rpc,
    signatureProvider: signature
})

async function destroyContract(id){
    try{
        const tx = await api.transact({
            actions:[
                {
                    account,
                    name:"destroy",
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
	console.log("\x1b[1;7;92m")
        console.log("DESTROY transaction details")
        console.log("\x1b[0m")
        console.log(tx.processed)
        console.log("\x1b[1;7;92m")
        console.log("RPC Push transaction action DESTROY details")
        console.log("\x1b[0m")
        console.log(tx.processed.action_traces[0].act)
        console.log("\x1b[1;7;92m")
        console.log(tx.processed.action_traces[0].console)
        console.log("\x1b[0m")
    }catch(error){
        console.log(error)
        console.log("\x1b[1;7;91m")
        console.log("ERROR : Can't destroy contract ID", id)
        console.log("DETAILS :", error.details[0].message)
        console.log("\x1b[0m")
    }
}

destroyContract(id)

