import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'ineryjs'
import * as dotenv from 'dotenv'
dotenv.config()

const url = "http://sys.blockchain-servers.world:8888"
const account = process.env.ACCOUNT
const priv_key = process.env.PRIV_KEY
const symbol = process.env.SYMBOL

const json_rpc = new JsonRpc(url)
const signature = new JsSignatureProvider([priv_key]);

const api = new Api({
  rpc: json_rpc,
  signatureProvider: signature
})

console.log( await api.transact({
  actions:[
    {
      account: "inery.token",
      name: "create",
      authorization: [{ actor: account, permission: "active" }],
      data:{ issuer: account, maximum_supply: "10000.0000 " + symbol }
    }
  ]
},{broadcast:true,sign:true}))

console.log( await api.transact({
  actions:[
    {
      account: "inery.token",
      name: "issue",
      authorization: [{ actor: account, permission: "active" }],
      data:{
        to: account,
	quantity: "1000.0000 " + symbol,
	memo: "Issue token via JSON-RPC push transaction"
      }
    }
  ]
},{broadcast:true,sign:true}))

