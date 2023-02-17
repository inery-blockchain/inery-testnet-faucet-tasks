import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'ineryjs/dist/index.js'
import * as dotenv from 'dotenv'
dotenv.config()

const account = process.env.INERY_ACCOUNT
const private_key = process.env.PRIVATE_KEY
const url = process.env.NODE_URL

const json_rpc = new JsonRpc(process.env.NODE_URL)
const signature  = new JsSignatureProvider([process.env.PRIVATE_KEY]);

const api = new Api({
    rpc: json_rpc,
    signatureProvider: signature
})

async function createCrud(id, user, data){
    try{
        const tx = await api.transact({
            actions:[
                {
                    account,
                    name:"create",
                    authorization:[
                        {
                            actor,
                            permission:"active"
                        }
                    ],
                    data:{
                        id, user, data
                    }
                }
            ]
        },{broadcast:true,sign:true})
        console.log("\x1b[1;7;92m")
	console.log("CREATE transaction details")
	console.log("\x1b[0m")
        console.log(tx.processed)
        console.log("\x1b[1;7;92m")
	console.log("RPC Push transaction action CREATE details")
	console.log("\x1b[0m")
        console.log(tx.processed.action_traces[0].act)
        console.log("\x1b[1;7;92m")
	console.log(tx.processed.action_traces[0].console)
	console.log("\x1b[0m")
    }catch(error){
        console.log(error)
    }
}

createCrud(id, account, create_data)
