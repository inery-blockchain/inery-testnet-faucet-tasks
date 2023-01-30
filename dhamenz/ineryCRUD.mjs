import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'ineryjs/dist/index.js'
import * as dotenv from 'dotenv'
dotenv.config()

const url = "http://146.190.82.28:8888"
const json_rpc = new JsonRpc(url) 
const private_key = process.env.PRIVATE_KEY
const actor = process.env.INERY_ACCOUNT
const account = "dhamenz"
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

        console.log("CREATE transaction details")       
        console.log()
        console.log(tx) 
        console.log(tx.processed.action_traces[0].console)
        console.log()
        console.log()
    }catch(error){
        console.log(error)
    }
}

async function read(id){
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

        console.log("READ transaction details")       
        console.log()
        console.log(tx) 
        console.log(tx.processed.action_traces[0].console)
        console.log()
        console.log()
    }catch(error){
        console.log(error)
    }
}

async function update(id, user, data){
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

        console.log("UPDATE transaction details")       
        console.log()
        console.log(tx) 
        console.log(tx.processed.action_traces[0].console)
        console.log()
        console.log()        
    }catch(error){
        console.log(error)
    }
}

async function destroy(id){
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
        
        console.log("DELETE transaction details")       
        console.log()       
        console.log(tx) 
        console.log(tx.processed.action_traces[0].console)        
    }catch(error){
        console.log(error)
    }
}

async function main(id, user, data){
    await create(id, user, data)
    await read(id)
    await update(id, user, data)
    await destroy(id)
}

main(1, account, "CRUD transaction via JSON RPC")
