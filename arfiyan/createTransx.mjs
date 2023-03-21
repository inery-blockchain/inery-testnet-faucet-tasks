import { userapi, actor, account } from "./config-inery.mjs";

// A Function to create new data in our Valued Smart Contract, and call "create" function on our Smart contract
async function create(id, user, data){
    try{
        // create new transaction and sign it
        const tx = await userapi.transact({
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
                        id,
                        user,
                        data,
                    }
                }
            ]
        },{broadcast:true,sign:true})
        
        console.log("+++++++++++++++++ CREATE TRANSACTION ++++++++++++++++++")
        
        console.log(tx, "\n")
        console.log("Response from contract :", tx.processed.action_traces[0].console)
        console.log("\n")
    }catch(error){
        console.log(error)
    }
}

async function main(id, user, data){
    await create(id, user, data)
    
}

// call RPC that we created in create function
main(1, account, "CRUD TRANSACTION by Arfiyan")