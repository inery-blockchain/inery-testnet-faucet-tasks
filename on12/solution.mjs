import { Api, JsonRpc, JsSignatureProvider } from 'ineryjs'
import * as dotenv from 'dotenv'
dotenv.config()

// get account data from env file
const url = process.env.URL
const account = process.env.INERY_ACCOUNT
const actor = process.env.INERY_ACCOUNT
const private_key = process.env.PRIVATE_KEY

const rpc = new JsonRpc(url);
const signatureProvider = new JsSignatureProvider([private_key]);

// prepare api 
const api = new Api({
    rpc, signatureProvider
})

// use api to create destroy read and update transaction
async function create(id, user, data){
    try{
        const transaction = await api.transact({
            actions: [{
                account,
                name: 'create',
                authorization: [{
                      actor,
                      permission: 'active'
                 }],
                data: {id, user, data}
            }]
        },
        {broadcast:true, sign:true});
        console.log(transaction, "\n");
    } catch(err){
        console.log(err)
    }
}


async function destroy(id){
    try{
        const transaction = await api.transact({
            actions: [{
                account,
                name: 'destroy',
                authorization: [{
                    actor,
                    permission: 'active'
                }],
                data: {id}
            }]
        },
        {broadcast:true, sign:true});
        console.log(transaction, "\n")
    } catch(err){
        console.log(err)
    }
}

async function update(id, data){
    try{
        const transaction = await api.transact({
            actions: [{
                account,
                name: 'update',
                authorization: [{
                        actor,
                        permission: 'active'
                    }],
                data: {id, data}
            }]
        },
        {broadcast:true, sign:true})
        console.log(transaction, "\n")
    } catch(err){
        console.log(err)
    }
}


async function main(id, user, data){
    await create(id, user, data)
    await update(id, data)
    await destroy(id)
}

main(3, account, "CRUD transaction via JSON RPC")