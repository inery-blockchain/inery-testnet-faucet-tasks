import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'ineryjs/dist/index.js'

const Url = "http://45.14.194.112:8888" //your vps ip
const PrivateKey = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" //private key
const Actor = "danau" //your inery account name
const Account = "danau" //your inery account name

const rpc = new JsonRpc(Url) //create rpc object
const sign  = new JsSignatureProvider([PrivateKey]) //create signature object
const api = new Api({rpc: rpc,signatureProvider: sign}) //create api object

//do create transaction
async function creating(id, user, data){
    try{
        console.log(await api.transact({
            actions:[
                api.with(Account).as(Actor).create(id, user, data)
            ]
        }));
    }
    catch(error){
        console.error(error);
    }
}

//do read transaction
async function reading(id){
    try{
        console.log(await api.transact({
            actions:[
                api.with(Account).as(Actor).read(id)
            ]
        }));
    }
    catch(error){
        console.error(error);
    }
}

//do update transaction
async function updating(id, user, data){
    try{
        console.log(await api.transact({
            actions:[
                api.with(Account).as(Actor).update(id, data)
            ]
        }));
    }
    catch(error){
        console.error(error);
    }
}

//do destroy transaction
async function destroying(id){
    try{
        console.log(await api.transact({
            actions:[
                api.with(Account).as(Actor).destroy(id)
            ]
        }));
    }
    catch(error){
        console.error(error);
    }
}

async function main(id, user){
    await creating(id, user, "create transaction")
    await reading(id)
    await updating(id, "update transaction")
    await destroying(id)
}

main(1, Account)