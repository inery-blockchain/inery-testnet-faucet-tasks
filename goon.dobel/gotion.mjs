import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'ineryjs';
const url= "https://198.211.105.127:8888" // input your node url or ip


const rpc = new JsonRpc(url);
const user1PrivateKey = "YOUR_PRIVATE_KEY"; // input your private key 
const account = goon.dobel
const signatureProvider = new JsSignatureProvider([user1PrivateKey]);

// Calling API
const api = new Api({ rpc: json_rpc,signatureProvider: signature})


// New transact

 const goTransaksi = async (id, user, data) => {
   cosnt goData = { id, user, data }
 }
    try{
        const tx = await api.transact({
        actions:[ {  account,  name:"create",
        authorization:[ { actor, permission:"active"
         } ], data:{ goData }  } ]
        },{broadcast:true,sign:true})
        
        console.log(tx)
	console.log("GO TRANS transaction details")
	console.log('/n')
        console.log(tx.processed)
	console.log('The Result', tx.processed)
        console.log(tx.processed.action_traces[0].act)
	console.log(tx.processed.action_traces[0].console)
    }catch(error){
        console.log(error)
        console.log('/n')
	console.log(' ERROR E ', id)
	console.log("DETAILS :", error.details[0].message)
	console.log("\x1b[0m"){
    }
}

const reads = async (id) 
    try{
        const tx = await api.transact({
        actions:[  {  account,  name:"read",
        authorization:[ {  actor,
        permission:"active" } ],
        data:{ id } }  ]
        },{broadcast:true,sign:true})
        
        console.log(tx)
	console.log(" READS transaction details")
	console.log('/n')
        console.log(tx.processed)
	console.log('The Results ', tx.processed)
        console.log(tx.processed.action_traces[0].act)
	console.log(tx.processed.action_traces[0].console)
    }catch(error){
        console.log(error)
        console.log('/n')
	console.log(' ERROR ', id)
	console.log("DETAILS :", error.details[0].message)
	console.log("\x1b[0m"){
    }
}

const updates = async ( user ,id) 
    try{
        const tx = await api.transact({
        actions:[  {  account,  name:"update",
        authorization:[ {  actor,
        permission:"active" } ],
        data:{user , id } }  ]
        },{broadcast:true,sign:true})
        
        console.log(tx)
	console.log(" UPDATE transaction details")
	console.log('/n')
        console.log(tx.processed)
	console.log('The Results ', tx.processed)
        console.log(tx.processed.action_traces[0].act)
	console.log(tx.processed.action_traces[0].console)
    }catch(error){
        console.log(error)
        console.log('/n')
	console.log(' ERROR ', id)
	console.log("DETAILS :", error.details[0].message)
	console.log("\x1b[0m"){
    }
}

const destroyed = async (id) 
    try{
        const tx = await api.transact({
        actions:[  {  account,  name:"destroy",
        authorization:[ {  actor,
        permission:"active" } ],
        data:{ id } }  ]
        },{broadcast:true,sign:true})
        
        console.log(tx)
	console.log(" DESTROYED transaction details")
	console.log('/n')
        console.log(tx.processed)
	console.log('The Results ', tx.processed)
        console.log(tx.processed.action_traces[0].act)
	console.log(tx.processed.action_traces[0].console)
    }catch(error){
        console.log(error)
        console.log('/n')
	console.log(' ERROR ', id)
	console.log("DETAILS :", error.details[0].message)
	console.log("\x1b[0m"){
    }
}

async function mainTe (id, user, data){
    await goTransaksi (id, user, data)
    await reads(id)
    await updates (user, id)
    await destroyed (id)
    
    mainTe ( 10, account "SAMPLE transaction via RPC JSON by goon.dobel " )
