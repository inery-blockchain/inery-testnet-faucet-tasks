// Import Something We Need
import { Api, JsonRpc, RpcError, JsSignatureProvider } from "ineryjs";
import dotenv from 'dotenv'

dotenv.config()

// declare some constant
const url = "http://109.123.244.217:8888"
const json_rpc = new JsonRpc(url)
const private_key = process.env.PRIVATE_KEY;

const account = process.env.INERY_ACCOUNT
const actor = hamzky
const signature  = new JsSignatureProvider([private_key]);

// For Calling API
const api = new Api({
    rpc: json_rpc,
    signatureProvider: signature
})

// Create an user data and call it
const CreateTransaction = async (id, user, data) => {
  const userdata = { id, user, data }

// Make a New Transaction and signed it
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
                    data:{
                        ...userdata
                    }
                }
            ]
        },{broadcast:true,sign:true})

// Check
        console.log(tx)
        console.log(tx.processed.action_traces[0].console)
    }catch(error){
        console.log(error)
    }
}

// Call RPC On Create Function
create(1, account, "Create a New Data by hamzky")
