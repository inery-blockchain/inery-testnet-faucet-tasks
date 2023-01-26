import { Api, JsonRpc, RpcError, JsSignatureProvider } from '../dist/index.js'
import * as dotenv from 'dotenv'
dotenv.config()

const url = process.env.IP

const json_rpc = new JsonRpc(url)
const private_key = process.env.KEY;

const account = process.env.ACCOUNT
const actor = process.env.ACCOUNT
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
        console.log('****************************************************************************') 
        console.log('*                   ACCOUNT : catsmile                                     *')
        console.log('*                      TASK : Test RPC API push transaction                *') 
        console.log('****************************************************************************') 
        console.log(tx) 
        console.log(tx.processed.action_traces[0].console)
    }catch(error){
        console.log(error)
    }
}

create(5, account, "Create new Data via JSON RPC")