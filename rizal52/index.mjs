import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'ineryjs'
import * as dotenv from 'dotenv'
dotenv.config()

const url = "http://10.148.0.4:8888"

const json_rpc = new JsonRpc(url) 
const private_key = process.env.PRIV_KEYS
const actor = process.env.INERY_NAME

const account = actor
const signature  = new JsSignatureProvider([private_key]); 

const api = new Api({
    rpc: json_rpc,
    signatureProvider: signature
})

async function createData(id, user, data){
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
        console.log("=================== CREATE transaction information ====================")
        console.log("=======================================================================")
        console.log(tx, "\n")
        console.log("Response from contract :", tx.processed.action_traces[0].console)
        console.log("\n")
    }catch(error){
        console.log(error)
    }
}

async function destroyData(id){
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

        
        console.log("=======================================================================")
        console.log("================== DESTROY transaction information ====================")
        console.log("=======================================================================")
        console.log(tx, "\n")
        console.log("Response from contract :", tx.processed.action_traces[0].console)
        console.log("\n")
    }catch(error){
        console.log(error)
    }
}


async function main(id, user, data){
    await createData(id, user, data)
    await destroyData(id)
}

main(1, account, "create by rizal52 inery task 4")
