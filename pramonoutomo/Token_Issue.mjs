import { Api, JsonRpc,JsSignatureProvider } from 'ineryJS/index.js'

const url = process.env.NODE_URL; //node url from env file
const json_rpc = new JsonRpc(url); 
const private_key = process.env.PRIVATE_KEY; //private_key from env file
const account = process.env.INERY_ACCOUNT; //inery_account from env file
const actor = process.env.INERY_ACCOUNT; //since the actor are same as account used, we're using the same data from inery_account
const signature  = new JsSignatureProvider([private_key]); //create a signature, this for sign your tx to get approved by networks.

//token variable below
const tokenaccountdeployer = "inery.token";
const tokenname = "tokentestname";
const tokensupply = "10000.0000";
const tokendetail = "deploying tokentestname on inerychain";
const tokennameAndtokensupply = tokensupply+" "+tokenname;

const api = new Api({
    rpc: json_rpc,
    signatureProvider: signature
})

async function IssueToken(){
    try{
        const tx = await api.transact({
            actions:[
                {
                  tokenaccountdeployer,
                  name:"issue",
                  authorization:[
                        {
                            actor,
                            permission:"active"
                        }
                    ],
                    data:{
                        account, tokennameAndtokensupply, tokendetail
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

IssueToken();