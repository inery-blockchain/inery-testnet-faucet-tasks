import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'ineryjs/dist/index.js'
import * as dotenv from 'dotenv'
dotenv.config()

const url = "http://5.75.228.144:8888"

const json_rpc = new JsonRpc(url) 
const private_key = process.env.PRIVATE_KEY
const actor = process.env.INERY_ACCOUNT

const account = "bayramov"
const signature  = new JsSignatureProvider([private_key]); 

const api = new Api({
    rpc: json_rpc,
    signatureProvider: signature
})

async function olustur(id, user, data){
    try{
        const data = await api.transact({
            actions:[
                {
                    account,
                    name:"olustur",
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

    }catch(error){
        console.log(error)
    }
}

async function dagit(id){
    try{
        const data = await api.transact({
            actions:[
                {
                    account,
                    name:"dagit",
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

    }catch(error){
        console.log(error)
    }
}


async function ana(id, user, data){
    await olustur(id, user, data)
    await dagit(id)
}

ana(1, account, "CRUD Transaction via JSON RPC")
