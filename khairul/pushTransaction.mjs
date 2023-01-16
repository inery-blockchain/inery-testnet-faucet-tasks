import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'ineryjs/dist/index.js'
import * as dotenv from 'dotenv'
dotenv.config()

const urlConfig = "http://149.102.159.105:8888";

const json_rpc = new JsonRpc(urlConfig);
const privateKey = process.env.YOUR_PRIVATE_KEY;
const account = process.env.YOUR_INERY_ACCOUNT;
const actor = "khairul";
const signature  = new JsSignatureProvider([privateKey]); 

const api = new Api({
    rpc: json_rpc,
    signatureProvider: signature
});

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

        

        console.log(" [!] CREATE transaction details")
        console.log(tx, "\n")
        console.log("Response :", tx.processed.action_traces[0].console)
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

        

        console.log(" [!] DESTROY transaction details")
        console.log(tx, "\n")
        console.log("Response :", tx.processed.action_traces[0].console)
        console.log("\n")
    }catch(error){
        console.log(error)
    }
}


const push = async (id, user, data) => {
    await create(id, user, data)
    await destroy(id)
}

push(1, account, "Transaction via JSON RPC Task 4 done !")
