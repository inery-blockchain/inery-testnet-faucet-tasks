import { userapi, actor, account } from "./config-inery.mjs";

async function read(id){
    try{
        const tx = await userapi.transact({
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
                    data:{
                        id
                    }
                }
            ]
        },{broadcast:true,sign:true})
        
        console.log("+++++++++++++++++ READ TRANSACTION ++++++++++++++++++")
        
        console.log(tx, "\n")
        console.log("Response from contract :", tx.processed.action_traces[0].console)
        console.log("\n")
    }catch(error){
        console.log(error)
    }
}

async function main(id, user, data){
    await read(id)
    
}

// call RPC that we created in create function
main(1, account, "CRUD TRANSACTION by Arfiyan")