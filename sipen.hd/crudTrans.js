import { reqApi, account , actor } from "./config"



// Create New transaction 



 const bikinCrud = async (id, user, data) => {
   cosnt bikData = { id, user, data }
 }
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
                    data:{ bikData }
                }
            ]
        },{broadcast:true,sign:true})
        
        console.log(tx)
	console.log("BIKIN CRUD transaction details")
	console.log('/n')
        console.log(tx.processed)
	console.log('The Respone', tx.processed)
        console.log(tx.processed.action_traces[0].act)
	console.log(tx.processed.action_traces[0].console)
    }catch(error){
        console.log(error)
        console.log('null')
	console.log(' ERROR ERROR ERROR ', id)
	console.log("DETAILS :", error.details[0].message)
	console.log("\x1b[0m"){
    }
}

const mocoCrud = async (id) 
    try{
        const tx = await api.transact({
            actions:[
                {
                    account,
                    name:"read",
                    authorization:[
                        {
                            actor,
                            permission:"active"
                        }
                    ],
                    data:{ id }
                } 
            ]
        },{broadcast:true,sign:true})
        
        console.log(tx)
	console.log(" MOCO CRUD transaction details")
	console.log('/n')
        console.log(tx.processed)
	console.log('The Respone', tx.processed)
        console.log(tx.processed.action_traces[0].act)
	console.log(tx.processed.action_traces[0].console)
    }catch(error){
        console.log(error)
        console.log('null')
	console.log(' ERROR ERROR ERROR ', id)
	console.log("DETAILS :", error.details[0].message)
	console.log("\x1b[0m"){
    }
}

const crushCrud = async (id) 
    try{
        const tx = await api.transact({
            actions:[
                {
                    account,
                    name:"crush",
                    authorization:[
                        {
                            actor,
                            permission:"active"
                        }
                    ],
                    data:{ id }
                } 
            ]
        },{broadcast:true,sign:true})
        
        console.log(tx)
	console.log(" CRUSH CRUD transaction details")
	console.log('/n')
        console.log(tx.processed)
	console.log('The Respone', tx.processed)
        console.log(tx.processed.action_traces[0].act)
	console.log(tx.processed.action_traces[0].console)
    }catch(error){
        console.log(error)
        console.log('null')
	console.log(' ERROR ERROR ERROR ', id)
	console.log("DETAILS :", error.details[0].message)
	console.log("\x1b[0m"){
    }
}



const anyarCrud = async (id, data) => {
   cosnt yarData = { id, data }
 }
    try{
        const tx = await api.transact({
            actions:[
                {
                    account,
                    name:"update",
                    authorization:[
                        {
                            actor,
                            permission:"active"
                        }
                    ],
                    data:{ bikData }
                }
            ]
        },{broadcast:true,sign:true})
        
        console.log(tx)
	console.log("ANYAR CRUD transaction details")
	console.log('/n')
        console.log(tx.processed)
	console.log('The Respone', tx.processed)
        console.log(tx.processed.action_traces[0].act)
	console.log(tx.processed.action_traces[0].console)
    }catch(error){
        console.log(error)
        console.log('null')
	console.log(' ERROR ERROR ERROR ', id)
	console.log("DETAILS :", error.details[0].message)
	console.log("\x1b[0m"){
    }
}

async function maen (id, user, data){
    await bikinCrud (id, user, data)
    await mocoCrud(id)
    await crushCrud(id)
    await anyarCrud(id, data)
}

maen (10055, account, "CRUD Transaction via JSON RPC")
