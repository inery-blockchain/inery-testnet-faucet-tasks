import { Api, JsonRpc, JsSignatureProvider } from 'ineryjs/dist/index.js'
import * as dotenv from 'dotenv'
dotenv.config()

const IpAdd = new JsonRpc(process.env.ADDRESS)
const HIDDEN = process.env.PRIVATE
const signature  = new JsSignatureProvider([HIDDEN]); 
const account = '' // Your Account
const apicall = new Api({
rpc: IpAdd, signatureProvider: signature })
async function Call_Create(id, user, data){
    try{
        const HashTX = await apicall.transact({
            actions:[
                    {account, name:'create',
                    authorization:[{actor:'msamanahce', permission:'active',}],
                    data:{ id, user, data}
                    }]},{broadcast:true,sign:true})
            console.log(HashTX)
        }catch(error){
    console.log(error)}}
async function Call_Kill(id){
    try{
         const HashTX = await apicall.transact({
              actions:[
                    {account, name:'destroy',
                    authorization:[{actor:'msamanahce', permission:'active',}],
                    data:{id}
                    }]},{broadcast:true,sign:true})
               console.log(HashTX)
        }catch(error){
    console.log(error)}}

async function main(id, user, data){
await Call_Create(id, user, data)
await Call_Kill(id)
} main(49,account)
