import { Api, JsonRpc, RpcError, JsSignatureProvider } from '../dist/index.js'
import * as dotenv from 'dotenv'
dotenv.config()

const urll = process.env.NODE_URLL

const json_rpcc = new JsonRpc(urll)
const private_keyy = process.env.PRIVATE_KEYY;

const accountt = process.env.INERY_ACCOUNTT
const actorr = process.env.INERY_ACCOUNTT
const signaturee  = new JsSignatureProvider([private_keyy]);

const api = new Api({
    rpc: json_rpcc,
    signatureProvider: signaturee
})

async function create(id, user, data){
    try{
        const tx = await api.transact({
            actions:[
                {
                    accountt,
                    name:"create",
                    authorization:[
                        {
                            actorr,
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

create(5, accountt, "Create new Data via JSON RPC")
