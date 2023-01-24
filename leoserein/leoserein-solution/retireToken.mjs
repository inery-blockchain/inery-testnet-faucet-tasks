import { Api, JsonRpc,JsSignatureProvider } from 'ineryjs/dist/index.js'

const url = process.env.INERY_NODE_URL 
const json_rpc = new JsonRpc(process.env.INERY_NODE_RPC)

const private_key = process.env.PRIVATE_KEY
const account = process.env.INERY_ACCOUNT
const actor = process.env.INERY_ACCOUNT
const token = process.env.TOKEN
const symbol = process.env.SYMBOL
const amount = process.env.AMOUNT
const message = process.env.MESSAGE

const signature  = new JsSignatureProvider([pocess.env.USER_INERY_PRIVATE_KEY])

const api = new Api({
    rpc: json_rpc,
    signatureProvider: signature
})

// Create new data in Smart Contract
async function retireToken(token, amount, message){ 
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
                        token, amount, message
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

retireToken(token, amount, message)