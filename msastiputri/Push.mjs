import { Api, JsonRpc, JsSignatureProvider } from 'ineryjs/dist/index.js'
import * as dotenv from 'dotenv'
dotenv.config()

const IP = "" //IP Address
const KEYS = '' // Private Key
const account = '' // Inery Account
const actor = '' // Inery Account
const permission = 'active' // Dont Change
const URL = new JsonRpc(IP)
const signature=new JsSignatureProvider([KEYS]);
const Human=new Api({rpc: URL,signatureProvider:signature})

async function RPC_Push (id, user, data){
    try{
    const hash = await Human.transact({
    actions:[{
             account, 
             name:'create', 
    authorization:[{
             actor, 
             permission,}],
    data:{ 
             id, 
             user, 
             data}}]},
    {broadcast:true,sign:true})
     console.log(hash)
     }catch(error){
     console.log(error);}};

async function RPC_Read (id){
     try{
     const hash = await Human.transact({
     actions:[{
              account, 
              name:'read', 
     authorization:[{
              actor, 
              permission,}],
     data:{ 
              id,}}]},
     {broadcast:true,sign:true})
     console.log(hash)
     }catch(error){
     console.log(error);}};

async function main(id, user, data){
    await RPC_Push(id, user, data)
    await RPC_Read(id)}
main(65, account)
