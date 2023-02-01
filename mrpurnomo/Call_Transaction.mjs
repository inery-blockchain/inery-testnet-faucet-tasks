import { Api, JsonRpc, JsSignatureProvider } from 'ineryjs/dist/index.js'
import * as dotenv from 'dotenv'
dotenv.config()

const KEYS = process.env.SCKey // Inery Key
const LOG = new JsonRpc(process.env.VPS) // IP Address
const account = process.env.Acc // Account
const actor = account // Call Account
const Proof  = new JsSignatureProvider([KEYS]); // Signature
const Thash = new Api({
rpc: LOG, signatureProvider: Proof}) // Auth
async function Create_Transaction(id, user, data){
    try{
        const Mhash = await Thash.transact({
            actions:[
                    {account, name:'create',
                    authorization:[{actor, permission:'active',}],
                    data:{ id, user, data}
                    }]},{broadcast:true,sign:true})
            console.log(Mhash)
        }catch(error){
    console.log(error)}}
async function Read_Transaction(id){
    try{
        const Mhash = await Thash.transact({
            actions:[
                    {account, name:'read',
                    authorization:[{actor, permission:'active',}],
                    data:{ id}
                    }]},{broadcast:true,sign:true})
            console.log(Mhash)
        }catch(error){
    console.log(error)}}
async function Kill_Transaction(id){
    try{
        const Mhash = await Thash.transact({
            actions:[
                    {account, name:'destroy',
                    authorization:[{actor, permission:'active',}],
                    data:{ id}
                    }]},{broadcast:true,sign:true})
            console.log(Mhash)
        }catch(error){
    console.log(error)}}
async function main(id, user, data){
await Create_Transaction(id, user, data)
await Read_Transaction(id)
await Kill_Transaction(id)
} main(11560,account)
