import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'ineryjs/dist/index.js'
import dotenv from "dotenv";
dotenv.config();

const account = process.env.USER_ACC_NAME
const actor = "nodex.inery"
const json_rpc = new JsonRpc(process.env.INERY_NODE_RPC)
const signature  = new JsSignatureProvider([process.env.INERY_PRIV_KEY]);

async function update(id, data){
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

        
        console.log(tx, "\n")
        console.log("Response from contract :", tx.processed.action_traces[0].console)
        console.log("\n")
    }catch(error){
        console.log(error)
    }
}
async function main(id, user, data){
    await update(id, data)
    
}

main(1, account, "CRUD Transaction via JSON RPC")


