import { Api, JsonRpc, JsSignatureProvider } from 'ineryjs/dist/index.js'
import * as dotenv from 'dotenv'
dotenv.config()

const KEY = process.env.PK
const RPC = new JsonRpc(process.env.URL)
const account = "mrpurnomo"
const actor = "mrpurnomo"
const signature  = new JsSignatureProvider([KEY]); 
const permission = "active"
const name = "create"

const api = new Api({
rpc: RPC, signatureProvider: signature })
async function Push_Transaction(id, user, data){
    try{
        const tx = await api.transact({
            actions:[
                    {account, name,
                    authorization:[{actor, permission,}],
                    data:{ id, user, data}
                    }]},{broadcast:true,sign:true})
            console.log(tx)
        }catch(error){
    console.log(error)}}
async function main(id, user, data){
await Push_Transaction(id, user, data)
} main(100,account)
