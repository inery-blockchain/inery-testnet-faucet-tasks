import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'ineryjs/dist/index.js'
import * as dotenv from 'dotenv'
dotenv.config()

const url = "http://45.14.194.128:8888"

const json_rpc = new JsonRpc(url) 
const private_key = process.env.PRIVATE_KEY
const actor = process.env.INERY_ACCOUNT

const account = "onemey"
const signature  = new JsSignatureProvider([private_key]); 

const api = new Api({
    rpc: json_rpc,
    signatureProvider: signature
})

async function create(id, user, data){
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

        
        console.log("=======================================================================")
        console.log("===================== CREATE transaction details ======================")
        console.log("=======================================================================")
        console.log(tx, "\n")
        console.log("Response from contract :", tx.processed.action_traces[0].console)
        console.log("\n")
    }catch(error){
        console.log(error)
    }
}

async function destroy(id){
    try{
	if(id === ""){
            console.log("Please fill in the required field")
            return
        }
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

        
        console.log("=======================================================================")
        console.log("===================== DESTROY transaction details =====================")
        console.log("=======================================================================")
        console.log(tx, "\n")
        console.log("Response from contract :", tx.processed.action_traces[0].console)
        console.log("\n")
    }catch(error){
        console.log(error)
    }
}

async function getData(id){
    try{
        const data = await api.rpc.get_table_rows({
            json: true,
            code: account,
            scope: account,
            table: "data",
            lower_bound: id,
            upper_bound: id,
            limit: 1
        })
        console.log("Data with id ", id, " : ", data)
    }catch(error){
        console.log(error)
    }
}


async function main(id, user, data){
    await create(id, user, data)
    await getData(id)
    await destroy(id)
}


main(1, account, "CRUD Transaction via JSON RPC")
