import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'ineryjs/dist/index.js'
const url = "http://128.199.194.7:8888"

const json_rpc = new JsonRpc(url)
const private_key = process.env.PRIVATE_KEY;

const account = "berlinforx"
const actor = process.env.INERY_ACCOUNT
const signature  = new JsSignatureProvider([private_key]);

const api = new Api({
    rpc: json_rpc,
    signatureProvider: signature
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

        
        console.log("===================== UPDATE transaction details ======================")
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

        
        console.log("===================== DESTROY transaction details =====================")
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

main(1, account, "CRUD Transaction via JSON RPC")