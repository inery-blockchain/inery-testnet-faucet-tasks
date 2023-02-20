import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'ineryjs/dist/index.js'
const url = "http://159.223.62.186:8888"

const json_rpc = new JsonRpc(url) 
const private_key = "5JSXMjGt4JxmR3pz5ZaSFeN9iKtGrXcKA4LKRWyQ7d7MH65vM3x"; 
const actor = "adim.serv1"

const account = "adimas12"
const signature  = new JsSignatureProvider([private_key]); 

const api = new Api({
    rpc: json_rpc,
    signatureProvider: signature
})

async function create_new(new_id, new_user, new_data){
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
                        id: new_id, user: new_user, data: new_data
                    }
                }
            ]
        },{broadcast:true,sign:true})

        
    
    }catch(error){
        console.log(error)
    }
}

async function read_account(id_read){
    try{
        const tx = await api.transact({
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
                        id: id_read
                    }
                }
            ]
        },{broadcast:true,sign:true})
        

    }catch(error){
        console.log(error)
    }
}

async function update_data(id_update, data_update){
    try{
        const tx = await api.transact({
            actions:[
                {
                    account,
                    name:"update",
                    authorization:[
                        {
                            actor,
                            permission:"active"
                        }
                    ],
                    data:{
                        id: id_update, data: data_update
                    }
                }
            ]
        },{broadcast:true,sign:true})

        
    }catch(error){
        console.log(error)
    }
}

async function destroy_acc(id_destroy){
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
                        id: id_destroy
                    }
                }
            ]
        },{broadcast:true,sign:true})


    }catch(error){
        console.log(error)
    }
}


async function main_data(id, user, data){
    await create_new(new_id, new_user, new_data)
    await read_account(id_read)
    await update_data(id_update, data_update)
    await destroy_acc(id_destroy)
}

main_data(1, account, "Task 4 Inery: CRUD Trx With JSON")