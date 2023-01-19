import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'ineryjs/dist/index.js'
import * as dotenv from 'dotenv'
dotenv.config()

const bline = "===================================================================="
const url = process.env.NODE_URL
const account = process.env.ACCOUNT
const priv_key = process.env.PRIV_KEY

const json_rpc = new JsonRpc(url)
const signature  = new JsSignatureProvider([priv_key]);

const api = new Api({
    rpc: json_rpc,
    signatureProvider: signature
})


async function pushTx(id, user, data){ // Declare push transaction function
  try{
    const create = await api.transact({
      actions:[
        {
          account: account,
          name: "create",
          authorization: [{ actor: account, permission: "active" }],
          data:{ id, user, data }
        }
      ]
    },{broadcast:true,sign:true})
      console.log(bline)
      console.log("CREATE Push transaction details :")
      console.log(bline)
      console.log(create)
      console.log(bline)
      console.log("CREATE Result: ", create.processed.action_traces[0].console)
      console.log(bline, "\n\n")

    }catch(error){
      console.log(error)
  };

  try{
    const destroy = await api.transact({
      actions: [
        {
          account: account,
          name: "destroy",
          authorization: [{ actor: account, permission: "active" }],
          data: { id }
        }
      ]
    },{broadcast:true,sign:true})
      console.log(bline)
      console.log("DESTROY Push transaction details :")
      console.log(bline)
      console.log(destroy)
      console.log(bline)
      console.log("DESTROY Result: ", destroy.processed.action_traces[0].console)
      console.log(bline)

    }catch(error){
      console.log(error)
  }
}

pushTx(18918, account, "bangzam11 INERY RPC push trannsaction") // Call push transaction function
