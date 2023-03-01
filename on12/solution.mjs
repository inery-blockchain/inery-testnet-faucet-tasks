import { Api, JsonRpc, JsSignatureProvider } from 'ineryjs/dist/index.js'
import * as dotenv from 'dotenv'
dotenv.config()

const private_key = process.env.PRIVATE_KEY
const account = process.env.INERY_ACCOUNT
const actor = account

const rpc = new JsonRpc(process.env.URL) 
const signature  = new JsSignatureProvider([private_key]); 

const api = new Api({rpc:rpc, signatureProvider:signature})


async function createTransaction(id, user, data){
    try {
        const transaction = await api.transact({
            actions:[{
                account,
                name: "create",
                authorization: [
                    {actor, permission:"active"}
                ],
                data: {id, user, data}
            }
            ]
        },
        {broadcast:true, sign:true})
    
        console.log("CREATE transaction: ", transaction)
        console.log("RESPONSE: ", transaction.processed.action_traces[0].console)
    } catch(e){
        console.log("Error: ", e)
    }
}

async function readTransaction(id){
    try {
        const transaction = await api.transact({
            actions: [{
                account, 
                name: "read",
                authorization: [{
                    actor, permission:"active"
                }],
                data: {id}
            }
            ]
        }, {broadcast:true, sign:true})
        console.log("READ transaction: ", transaction)
        console.log("RESPONSE: ", transaction.processed.action_traces[0].console)
    } catch(e){
        console.log("Error: ", e)
    }

}

async function destroyTransaction(id){
    try {
        const transaction = await api.transact({
            actions: [{
                account, 
                name: "destroy",
                authorization: [{
                    actor, permission:"active"
                }],
                data: {id}
            }
            ]
        }, {broadcast:true, sign:true})
        console.log("DELETE transaction: ", transaction)
        console.log("RESPONSE: ", transaction.processed.action_traces[0].console)
    } catch(e){
        console.log("Error: ", e)
    }

}

async function main(id, user, data){
    await createTransaction(id, user, data)
    await readTransaction(id)
    await destroyTransaction(id)
}

main(1, account, "A sample rpc transaction for inery blockchain")
