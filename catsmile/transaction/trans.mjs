import { Api, JsonRpc, RpcError, JsSignatureProvider } from '../dist/index.js'
import * as dotenv from 'dotenv' 
dotenv.config()

const var_ip = process.env.NODEINNERY
const var_json_rpc = new JsonRpc(var_ip) 
const var_key = process.env.KEYINNERY; 
const var_validate  = new JsSignatureProvider([var_key]);
const account = process.env.ACCINNERY 
const actor = process.env.ACCINNERY 

const read = new Api({
    rpc: var_json_rpc,
    signatureProvider: var_validate
})
async function update(id, data){
    try{
        const push = await read.transact({
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

        console.log(push) 
        console.log(push.processed.action_traces[0].console)
    }catch(error){
        console.log(error)
    }
}
update(3,"Transaction via JSON RPC catsmile")
