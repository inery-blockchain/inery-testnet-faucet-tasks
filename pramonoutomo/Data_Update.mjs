import { Api, JsonRpc,JsSignatureProvider } from 'ineryjs/dist/index.js'

const url = process.env.NODE_URL; //node url from env file
const json_rpc = new JsonRpc(url); 
const private_key = process.env.PRIVATE_KEY; //private_key from env file
const account = process.env.INERY_ACCOUNT; //inery_account from env file
const actor = process.env.INERY_ACCOUNT; //since the actor are same as account used, we're using the same data from inery_account
const signature  = new JsSignatureProvider([private_key]); //create a signature, this for sign your tx to get approved by networks.

const api = new Api({
    rpc: json_rpc,
    signatureProvider: signature
})

async function updateData(id, user, data){
    try{
        const tx = await api.transact({
            actions:[
                {
                    account, //name of your inery account which hold the contract
                    name:"update", //the function you call from your account
                    authorization:[
                        {
                            actor, 
                            permission:"active" 
                        }
                    ],
                    data:{ //updating data need exact id and user, if you're trying using different account, it may not having access to update it.
                        id, user, data 
                    }
                }
            ]
        },{broadcast:true,sign:true})
        //console.log(tx); //show all log received from the request
        console.log(tx.processed.action_traces[0].console); //show logs for the latest transaction you do.
    }catch(error){
        console.log(error); //show logs if there is any error
    }
}

let currentDate = new Date();
let cDay = currentDate.getDate();
let cMonth = currentDate.getMonth() + 1;
let cYear = currentDate.getFullYear();
updateData(1, actor,"This Data has been updated on "+cDay+"/"+cMonth+"/"+cYear);