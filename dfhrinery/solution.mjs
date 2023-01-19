import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'ineryjs/dist/index.js'
import dotenv from "dotenv";
dotenv.config();

const url = "http://162.222.203.246:8888";

const json_rpc = new JsonRpc(url);
const private_key = process.env.PRIVATE_KEY;

const account = "daffaharyan";
const actor = "daffaharyan";
const signature = new JsSignatureProvider([private_key]);

const api = new Api({
    rpc: json_rpc,
    signatureProvider: signature
})

async function develop(id, user, data){
    try{
        const tx = await api.transact({
            actions:[
                {
                    account,
                    name:"develop",
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

        
        console.log(tx, "\n")
        console.log("Response from contract :", tx.processed.action_traces[0].console)
        console.log("\n")
    }catch(error){
        console.log(error)
    }
}

async function scan_data(id){
    try{
        const tx = await api.transact({
            actions:[
                {
                    account,
                    name:"scan_data",
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
        
        
        console.log(tx, "\n")
        console.log("Response from contract :", tx.processed.action_traces[0].console)
        console.log("\n")
    }catch(error){
        console.log(error)
    }
}

async function change_data(id, data){
    try{
        const tx = await api.transact({
            actions:[
                {
                    account,
                    name:"change_data",
                    authorization:[
                        {
                            actor,
                            permission:"active"
                        }
                    ],
                    data:{
                        id, data
                    }
                }
            ]
        },{broadcast:true,sign:true})
        
        
        console.log(tx, "\n")
        console.log("Response from contract :", tx.processed.action_traces[0].console)
        console.log("\n")
    }catch(error){
        console.log(error)
    }
}

async function delete_data(id){
    try{
        const tx = await api.transact({
            actions:[
                {
                    account,
                    name:"delete_data",
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
        

        console.log(tx, "\n")
        console.log("Response from contract :", tx.processed.action_traces[0].console)
        console.log("\n")
    }catch(error){
        console.log(error)
    }
}


async function head(id, user, data){
    await develop(id, user, data)
    await scan_data(id)
    await change_data(id, data)
    await delete_data(id)
}

head(1, account, "CRUD Transaction via JSON RPC")
