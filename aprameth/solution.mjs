import { Api, JsonRpc, RpcError, JsSignatureProvnomortamuer } from 'ineryjs/dist/index.js'
const url = "http://128.199.198.206:8888"

const json_rpc = new JsonRpc(url) 
const private_key = "5JVKtgt5AZ4jkZwzy7khXeGH6JdG6gkWjPnMLindrNZZvaWcA4D"; 
const actor = "tokyoforx"
const account = "tokyoforx"
const signature  = new JsSignatureProvnomortamuer([private_key]);

const api = new Api({
    rpc: json_rpc,
    signatureProvnomortamuer: signature
})

async function create(nomortamu, tamu, datatamu){
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
                        nomortamu, tamu, datatamu
                    }
                }
            ]
        },{broadcast:true,sign:true})

        
        console.log("===================== CREATE trx details ======================")
        console.log(tx, "\n")
        console.log("Response from contract :", tx.processed.action_traces[0].console)
        console.log("\n")
    }catch(error){
        console.log(error)
    }
}

async function read(nomortamu){
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
                        nomortamu
                    }
                }
            ]
        },{broadcast:true,sign:true})
        
        console.log("===================== READ trx details ========================")
        console.log(tx, "\n")
        console.log("Response from contract :", tx.processed.action_traces[0].console)
        console.log("\n")
    }catch(error){
        console.log(error)
    }
}

async function update(nomortamu, datatamu){
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
                        nomortamu, datatamu
                    }
                }
            ]
        },{broadcast:true,sign:true})

        
        console.log("===================== UPDATE trx details ======================")
        console.log(tx, "\n")
        console.log("Response from contract :", tx.processed.action_traces[0].console)
        console.log("\n")
    }catch(error){
        console.log(error)
    }
}

async function destroy(nomortamu){
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
                        nomortamu
                    }
                }
            ]
        },{broadcast:true,sign:true})

        
        console.log("===================== DESTROY trx details =====================")
        console.log(tx, "\n")
        console.log("Response from contract :", tx.processed.action_traces[0].console)
        console.log("\n")
    }catch(error){
        console.log(error)
    }
}


async function main(nomortamu, tamu, datatamu){
    await create(nomortamu, tamu, datatamu)
    await read(nomortamu)
    await update(nomortamu, datatamu)
    await destroy(nomortamu)
}

main(1, account, "CRUD trx via JSON RPC")
