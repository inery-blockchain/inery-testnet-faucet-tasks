import { Api, JsonRpc, JsSignatureProvider } from '../dist/index.js'
import * as dotenv from 'dotenv' 

dotenv.config()

const url = process.env.NODE_URL
const json_rpc = new JsonRpc(url)
const private_key = process.env.PRIVATE_KEY;
const account = process.env.INERY_ACCOUNT
const actor = process.env.INERY_ACCOUNT
const signature  = new JsSignatureProvider([private_key]);
const api = new Api({ rpc: jsonRpc, signatureProvider });

async function deleting(id){
    try{
      const tx = await api.transact({
            actions:[
                {
                  account,
                  name:"dbdestroy",
                  authorization:[
                        {
                            actor:"wardy"
                            permission:"active"
                        }
                    ],
                    data:{
                        id
                    }
                }
            ]
        },{broadcast:true,sign:true})

        console.log(tx) // output the tx to terminal, it's Json Object
        console.log(tx.processed.action_traces[0].console)
    }catch(error){
        console.log(error)
    }
}

deleting(10,  "Deleting Data via JSON RPC")
