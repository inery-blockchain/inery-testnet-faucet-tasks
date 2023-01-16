import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'index.js'
import * as dotenv from 'dotenv' 
dotenv.config()

// check it on your node, /inery-node/inery.setup/tools/config.json HTTP_ADDRESS key
const url = process.env.NODE_URL

const json_rpc = new JsonRpc(url) 
const private_key = process.env.PRIVATE_KEY; 

const account = process.env.INERY_ACCOUNT 
const actor = process.env.INERY_ACCOUNT 
const signature  = new JsSignatureProvider([private_key]); 

// calling API
const api = new Api({
    rpc: json_rpc,
    signatureProvider: signature
})

// A Function to create new data in our Valued Smart Contract, and call "updatePUSH" function on our Smart contract
async function update(id,  data){
    try{
        const tx = await api.transact({
            actions:[
                {
                    account,
                    name:"updatePUSH",
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

        console.log(tx)
        console.log(tx.processed.action_traces[0].console)
    }catch(error){
        console.log(error)
    }
}

// calling RPC that we created in create function
update(10,  "Modify Data")
