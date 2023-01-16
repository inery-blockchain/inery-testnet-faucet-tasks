import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'ineryjs/dist/index.js'
import dotenv from "dotenv";
dotenv.config();

const account = process.env.USER_ACC_NAME
const json_rpc = new JsonRpc(process.env.INERY_NODE_RPC)
const signature  = new JsSignatureProvider([process.env.INERY_PRIV_KEY]);

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
     
        console.log(tx, "\n")
        console.log("Response from contract :", tx.processed.action_traces[0].console)
        console.log("\n")
    }catch(error){
        console.log(error)
    }
}

async function main(id, user, data){
    await destroy(id)
}

main(1, account, "CRUD Transaction via JSON RPC")
