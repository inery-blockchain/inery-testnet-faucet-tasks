import { Api, JsonRpc, JsSignatureProvider } from 'ineryjs/dist/index.js'

// This Code Only For Testing, I Build This Code Without .env ENJOY

const IPAdd = " "    // IP Address With http://IP:8888
const actor = ' '    // Inery Account (Name)
const KEYStore = ' ' // Private Key
const permission = 'active'
const account = actor
const YourADD = new JsonRpc(IPAdd)
const Validation = new JsSignatureProvider([KEYStore]);
const HumanId = new Api({rpc: YourADD,signatureProvider:Validation})

async function RPC_Create (id, user, data){
try{ const hash = await HumanId.transact({
actions:[{ account,name:'create',authorization:[{ actor,permission,}],data:{id, user, data}}]},
{broadcast:true,sign:true})
  console.log(hash)
    }catch(error){
      console.log(error);}};
async function RPC_Read (id){
try{ const hash = await HumanId.transact({
actions:[{account,name:'read',authorization:[{actor, permission,}],data:{id}}]},
{broadcast:true,sign:true})
  console.log(hash)
    }catch(error){
      console.log(error);}};
async function RPC_Update (id, data){
try{ const hash = await HumanId.transact({
actions:[{account,name:'update',authorization:[{actor, permission,}],data:{id, data}}]},
{broadcast:true,sign:true})
  console.log(hash)
    }catch(error){
      console.log(error);}};
async function RPC_Delete (id){
try{const hash = await HumanId.transact({
actions:[{account,name:'destroy',authorization:[{actor, permission,}],data:{id}}]},
{broadcast:true,sign:true})
  console.log(hash)
    }catch(error){
      console.log(error);}};    

async function main(id, user, data){
await RPC_Create(id, user, data)
await RPC_Read(id)
await RPC_Update(id, data)
await RPC_Delete(id)}
main(260, account)
