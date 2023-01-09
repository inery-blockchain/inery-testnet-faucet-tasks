import { Api, JsonRpc, JsSignatureProvider } from '../dist/index.js'
import * as dotenv from 'dotenv' 
dotenv.config()
const url = process.env.NODE_URL
const json_rpc = new JsonRpc(url)
const private_key = process.env.PRIVATE_KEY;
const account = process.env.INERY_ACCOUNT
const actor = process.env.INERY_ACCOUNT
const signature  = new JsSignatureProvider([private_key]);
const api = new Api({
    rpc: json_rpc,
    signatureProvider: signature
})
async function updating(id, user, data){
    try{
        const tx = await api.transact({
            actions:[
                {
                  account,
                  name:"dbupdate",
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
        console.log(tx) 
        console.log(tx.processed.action_traces[0].console)
    }catch(error){
        console.log(error)
    }
}
updating(1, actor,"data update")