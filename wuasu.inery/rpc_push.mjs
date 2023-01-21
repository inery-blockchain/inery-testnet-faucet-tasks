import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'ineryjs'
import * as dotenv from 'dotenv'
dotenv.config()

const url = "http://sys.blockchain-servers.world:8888"
const account = process.env.ACCOUNT
const priv_key = process.env.PRIV_KEY

const json_rpc = new JsonRpc(url)
const signature = new JsSignatureProvider([priv_key]);

const api = new Api({
  rpc: json_rpc,
  signatureProvider: signature
})

console.log( await api.transact({
  actions:[
    {
      account: account,
      name: "destroy",
      authorization: [{ actor: account, permission: "active" }],
      data:{ id: 1999, user: account, data: "Destroy record rpc push" }
    }
  ]
},{broadcast:true,sign:true}))

console.log( await api.transact({
  actions:[
    {
      account: account,
      name: "destroy",
      authorization: [{ actor: account, permission: "active" }],
      data:{ id: 1999, user: account, data: "Destroy record rpc push" }
    }
  ]
},{broadcast:true,sign:true}))

