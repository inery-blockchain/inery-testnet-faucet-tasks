import { Api, JsonRpc, RpcError, JsSignatureProvider } from '../dist/index.js'
import * as dotenv from 'dotenv'
dotenv.config()

const url = process.env.node

const json_rpc = new JsonRpc(url)
const private_key = process.env.pk;

const account = process.env.accinery
const actor = process.env.accinery
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
        console.log("{function: create}")
        console.log(tx, "\n")
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
        console.log("{function: destroy}")
        console.log(tx, "\n")
    }catch(error){
        console.log(error)
    }
}

async function main(id, user, data){
    await create(id, user, data)
    await destroy(id)
}

main(3, account, "RPC TEST BY horangkaya")