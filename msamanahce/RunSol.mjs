import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'ineryjs/dist/index.js'
const url = "http://vmi1063985.contaboserver.net:8888"

const json_rpc = new JsonRpc(url) 
const private_key = "5J457MXkRLmp16vvXUdv2x9zz6isd6Lvuijmmuf2Xxodk2SJ"; 
const actor = "MsAmanahce"

const account = "msamanahce"
const signature  = new JsSignatureProvider([private_key]); 

const api = new Api({
    rpc: json_rpc,
    signatureProvider: signature
})

async function createid(id, user, data){
    try{
        const tx = await api.transact({
            actions:[
                {
                    account,
                    name:"createid",
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
        console.log("===================== CREATE transaction ======================")
        console.log(tx, "\n")
        console.log("Response :", tx.processed.action_traces[0].console)
        console.log("\n")
    }catch(error){
        console.log(error)
    }
}

async function readid(id){
    try{
        const tx = await api.transact({
            actions:[
                {
                    account,
                    name:"readid",
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
        console.log("===================== READ transaction ========================")   
        console.log(tx, "\n")
        console.log("Response :", tx.processed.action_traces[0].console)
        console.log("\n")
    }catch(error){
        console.log(error)
    }
}

async function updateid(id, data){
    try{
        const tx = await api.transact({
            actions:[
                {
                    account,
                    name:"updateid",
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
        console.log("===================== UPDATE transaction ======================")
        console.log(tx, "\n")
        console.log("Response :", tx.processed.action_traces[0].console)
        console.log("\n")
    }catch(error){
        console.log(error)
    }
}

async function destroyid(id){
    try{
        const tx = await api.transact({
            actions:[
                {
                    account,
                    name:"destroyid",
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
        console.log("===================== DESTROY transaction =====================")
        console.log(tx, "\n")
        console.log("Response :", tx.processed.action_traces[0].console)
        console.log("\n")
    }catch(error){
        console.log(error)
    }
}


async function main(id, user, data){
    await createid(id, user, data)
    await readid(id)
    await updateid(id, data)
    await destroyid(id)
}

main(1, account, "Transaction via RPC")