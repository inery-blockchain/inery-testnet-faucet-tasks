import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'ineryjs/dist/index.js'
import * as dotenv from 'dotenv'
dotenv.config()

const account = process.env.USER_ACC_NAME
const actor = account
const id = process.env.DATA_ID
const create_data = process.env.CREATE_CRUD_DATA

const json_rpc = new JsonRpc(process.env.INERY_NODE_RPC)
const signature  = new JsSignatureProvider([process.env.INERY_PRIV_KEY]);

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
        console.log("\x1b[1;7;91m")
	console.log("ERROR : Can't create contract ID", id)
	console.log("DETAILS :", error.details[0].message)
	console.log("\x1b[0m")
    }
}
async function readContract(id){
    try{
        const tx = await api.transact({
            actions:[
                {
                    account,
                    name:"read",
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
        console.log("READ transaction details")
        console.log("\x1b[0m")
        console.log(tx.processed)
        console.log("\x1b[1;7;92m")
        console.log("RPC Push transaction action READ details")
        console.log("\x1b[0m")
        console.log(tx.processed.action_traces[0].act)
        console.log("\x1b[1;7;92m")
        console.log(tx.processed.action_traces[0].console)
        console.log("\x1b[0m")
    }catch(error){
        console.log(error)
        console.log("\x1b[1;7;91m")
        console.log("ERROR : Can't read contract ID", id)
        console.log("DETAILS :", error.details[0].message)
        console.log("\x1b[0m")
    }
}
async function updateContract(id, data){
    try{
        const tx = await api.transact({
            actions:[
                {
                    account,
                    name:"update",
                    authorization:[
                        {
                            actor,
                            permission:"active"
                        }
                    ],
                    data:{
                        id, data
                    }
                }
            ]
        },{broadcast:true,sign:true})
	console.log("\x1b[1;7;92m")
        console.log("U0DATE transaction details")
        console.log("\x1b[0m")
        console.log(tx.processed)
        console.log("\x1b[1;7;92m")
        console.log("RPC Push transaction action UPDATE details")
        console.log("\x1b[0m")
        console.log(tx.processed.action_traces[0].act)
        console.log("\x1b[1;7;92m")
        console.log(tx.processed.action_traces[0].console)
        console.log("\x1b[0m")
    }catch(error){
        console.log(error)
        console.log("\x1b[1;7;91m")
        console.log("ERROR : Can't update contract ID", id)
        console.log("DETAILS :", error.details[0].message)
        console.log("\x1b[0m")
    }
}
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
async function inerypush(id, user, data){
    await createCrud(id, account, data)
    await readContract(id)
    await updateContract(id, data)
    await destroyContract(id)
}

inerypush(1, account, "push transaction")
