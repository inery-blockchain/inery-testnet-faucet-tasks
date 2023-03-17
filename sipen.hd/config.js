import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'ineryjs/dist/index.js'
import * as dotenv from 'dotenv'
dotenv.config()


const url = "http://165.227.141.118:8888" // submit your IP VPS or NODE URL
const account = "sipen.hd" // submit your account name inery 
const private_key = process.env.PRIVATE_KEY // submit your private key 

const actor = "sipenhd" // change your name 
const json_rpc = new JsonRpc (process.env.INERY_NODE_RPC)
const signature  = new JsSignatureProvider ([process.env.INERY_PRIV_KEY]);

// Request API 
const Api = new Api({
    rpc: json_rpc,
    signatureProvider: signature
})

export ( Api , account , actor  ) 
