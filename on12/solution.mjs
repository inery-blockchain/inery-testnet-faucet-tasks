import { Api, JsonRpc, JsSignatureProvider } from 'ineryjs/dist/index.js'
import * as dotenv from 'dotenv'
dotenv.config()

// get account data from env file
const url = process.env.URL
const account = process.env.INERY_ACCOUNT
const actor = process.env.INERY_ACCOUNT
const private_key = process.env.PRIVATE_KEY

// prepare api 
const json_rpc = new JsonRpc(url) 
const signature  = new JsSignatureProvider([private_key]); 

const api = new Api({
    rpc: json_rpc,
    signatureProvider: signature
})

// use api to push kill and update transaction
async function push(id, usr, dt){
    try{
        const transaction = await api.transact({
            actions: [
                {
                    account,
                    name: 'create',
                    authorization: [
                        {
                            actor,
                            permission: 'active'
                        }
                    ],
                    data: {id, usr, dt}
                }
            ]
        },
        {
            broadcast:true,
            sign:true
        })
        console.log(transaction, "\n")
        console.log("Response: ", transaction.processed.action_traces[0].console)
    } catch(err){
        console.log(err)
    }
}


async function kill(id){
    try{
        const transaction = await api.transact({
            actions: [
                {
                    account,
                    name: 'destroy',
                    authorization: [
                        {
                            actor,
                            permission: 'active'
                        }
                    ],
                    data: {id}
                }
            ]
        },
        {
            broadcast:true,
            sign:true
        })
        console.log(transaction, "\n")
        console.log("Response: ", transaction.processed.action_traces[0].console)
    } catch(err){
        console.log(err)
    }
}

async function update(id, dt){
    try{
        const transaction = await api.transact({
            actions: [
                {
                    account,
                    name: 'update',
                    authorization: [
                        {
                            actor,
                            permission: 'active'
                        }
                    ],
                    data: {id, dt}
                }
            ]
        },
        {
            broadcast:true,
            sign:true
        })
        console.log(transaction, "\n")
        console.log("Response: ", transaction.processed.action_traces[0].console)
    } catch(err){
        console.log(err)
    }
}


async function main(id, usr, dt){
    await push(id, usr, dt)
    await update(id, dt)
    await kill(id)
}

main(1, account, "CRUD transaction via JSON RPC")