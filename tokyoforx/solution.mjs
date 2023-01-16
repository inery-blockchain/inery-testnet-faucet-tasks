import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'ineryjs/dist/index.js'
const url = "http://128.199.198.206:8888"

const json_rpc = new JsonRpc(url)
const private_key = process.env.PRIVATE_KEY;

const account = "tokyoforx"
const actor = process.env.INERY_ACCOUNT
const signature  = new JsSignatureProvider([private_key]);

const api = new Api({
    rpc: json_rpc,
    signatureProvider: signature
})

async function create(urutan, uwong, datauwong){
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
                        urutan, uwong, datauwong
                    }
                }
            ]
        },{broadcast:true,sign:true})

        
        console.log("===================== Detail Transaksi Gawean ======================")
        console.log(tx, "\n")
        console.log("Response from contract :", tx.processed.action_traces[0].console)
        console.log("\n")
    }catch(error){
        console.log(error)
    }
}


async function read(urutan){
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
                        urutan
                    }
                }
            ]
        },{broadcast:true,sign:true})
        
        console.log("===================== Detail Transaksi Woco ========================")
        console.log(tx, "\n")
        console.log("Response from contract :", tx.processed.action_traces[0].console)
        console.log("\n")
    }catch(error){
        console.log(error)
    }
}

async function update(urutan, datauwong){
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
                        urutan, datauwong
                    }
                }
            ]
        },{broadcast:true,sign:true})

        
        console.log("===================== Detail Transaksi Terakhir ======================")
        console.log(tx, "\n")
        console.log("Response from contract :", tx.processed.action_traces[0].console)
        console.log("\n")
    }catch(error){
        console.log(error)
    }
}

async function destroy(urutan){
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
                        urutan
                    }
                }
            ]
        },{broadcast:true,sign:true})

        
        console.log("===================== Detail Transaksi Lebur =====================")
        console.log(tx, "\n")
        console.log("Response from contract :", tx.processed.action_traces[0].console)
        console.log("\n")
    }catch(error){
        console.log(error)
    }
}


async function main(urutan, uwong, datauwong){
    await create(urutan, uwong, datauwong)
    await read(urutan)
    await update(urutan, datauwong)
    await destroy(urutan)
}

main(1, account, "Transaksi CRUD dari JSON RPC")