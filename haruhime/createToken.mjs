import { Api, JsonRpc,JsSignatureProvider } from '../dist/index.js'

const url = process.env.NODE_URL

const json_rpc = new JsonRpc(url)
const private_key = process.env.PRIVATE_KEY;

const account = process.env.INERY_ACCOUNT
const actor = process.env.INERY_ACCOUNT
const token = process.env.TOKEN
const signature  = new JsSignatureProvider([private_key]);

const api = new Api({
    rpc: json_rpc,
    signatureProvider: signature
})

async function addData(issuer, maximum_supply){
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
                        issuer, maximum_supply
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

addData(actor, token)
