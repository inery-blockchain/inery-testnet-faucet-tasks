import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'ineryjs/dist/index.js'
const url = process.env.NODE_URL

const json_rpc = new JsonRpc(url)
const private_key = process.env.PRIVATE_KEY;

const akun = process.env.INERY_ACCOUNT
const aktor = process.env.INERY_ACCOUNT
const ttd  = new JsSignatureProvider([private_key]);

const api = new Api({
    rpc: json_rpc,
    signatureProvider: ttd
})

async function create(id, user, data){
    try{
        const tx = await api.transact({
            actions:[
                {
                    akun,
                    name:"create",
                    authorization:[
                        {
                            aktor,
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

async function read(id){
    try{
        const tx = await api.transact({
            actions:[
                {
                    akun,
                    name:"read",
                    authorization:[
                        {
                            aktor,
                            permission:"active"
                        }
                    ],
                    data:{
                        id
                    }
                }
            ]
        },{broadcast:true,sign:true})
        
        console.log("Response from contract :", tx.processed.action_traces[0].console)
        console.log("\n")
    }catch(error){
        console.log(error)
    }
}

async function update(id, data){
    try{
        const tx = await api.transact({
            actions:[
                {
                    akun,
                    name:"update",
                    authorization:[
                        {
                            aktor,
                            permission:"active"
                        }
                    ],
                    data:{
                        id, data
                    }
                }
            ]
        },{broadcast:true,sign:true})

        console.log("Response from contract :", tx.processed.action_traces[0].console)
        console.log("\n")
    }catch(error){
        console.log(error)
    }
}

async function destroy(id){
    try{
        const tx = await api.transact({
            actions:[
                {
                    akun,
                    name:"destroy",
                    authorization:[
                        {
                            aktor,
                            permission:"active"
                        }
                    ],
                    data:{
                        id
                    }
                }
            ]
        },{broadcast:true,sign:true})

        console.log("Response from contract :", tx.processed.action_traces[0].console)
        console.log("\n")
    }catch(error){
        console.log(error)
    }
}


async function main(id, user, data){
    await create(id, user, data)
    await read(id)
    await update(id, data)
    await destroy(id)
}

main(1, account, "CRUD Transaction via JSON RPC")