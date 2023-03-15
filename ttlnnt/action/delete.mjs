import { Api } from "../node_modules/ineryjs/dist/ineryjs-api.js";
import { JsonRpc } from "ineryjs/dist/ineryjs-jsonrpc.js";
import { JsSignatureProvider } from "ineryjs/dist/ineryjs-jssig.js";
import dotenv from "dotenv";
dotenv.config();

const url = process.env.NODE_URL
const json_rpc = new JsonRpc(url) // create new JsonRPC using our node url
const private_key = process.env.PRIVATE_KEY; // private key

const account = process.env.INERY_ACCOUNT // Inery Smart Contract Account to Call
const actor = process.env.INERY_ACCOUNT // The Signer, should match with your provided Private Key
const signature  = new JsSignatureProvider([private_key]); // creating Signer from private key


const api = new Api({
    rpc: json_rpc,
    signatureProvider: signature
})

async function destroy(id){
    try{
        const tx = await api.transact({
            actions:[
                {
                    account,
                    name:"destroy",
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

        
        console.log("=======================================================================")
        console.log("===================== DESTROY transaction details =====================")
        console.log("=======================================================================")
        console.log(tx, "\n")
        console.log("Response from contract :", tx.processed.action_traces[0].console)
        console.log("\n")
    }catch(error){
        console.log(error)
    }
}

export async function deleteaction(id) {
  await destroy(id);
}
