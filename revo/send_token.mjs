import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'ineryjs/dist/index.js'
import * as dotenv from 'dotenv' 
dotenv.config()

const url = process.env.NODE_URL

const json_rpc = new JsonRpc(url)
const private_key = process.env.PRIVATE_KEY;

const actor = process.env.INERY_ACCOUNT
const acc2 = process.env.INERY_ACC2
const token = process.env.TOKEN
const signature  = new JsSignatureProvider([private_key]);

const api = new Api({
    rpc: json_rpc,
    signatureProvider: signature
})


async function transfer(from, to, quantity, memo){
    try{
        const tx = await api.transact({
            actions:[
                {
                    account: "inery.token",
                    name:"transfer",
                    authorization:[
                        {
                            actor,
                            permission:"active"
                        }
                    ],
                    data:{
                        from, to, quantity, memo
                    }
                }
            ]
        },{broadcast:true,sign:true})

        console.log("=======================================================================")
        console.log("============================  SEND TOKEN  =============================")
        console.log("=======================================================================")
        console.log(tx, "\n")
        console.log("Response from contract :", tx.processed.action_traces[0].console)
        console.log("\n")
    }catch(error){
        console.log(error)
    }
}

transfer(actor, acc2, token, "memo")
