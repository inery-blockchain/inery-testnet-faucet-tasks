import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'ineryjs'
import * as dotenv from 'dotenv'
dotenv.config()

// Api configuration
const rpc = new JsonRpc(process.env.NODE_URL)
const signatureProvider = new JsSignatureProvider([process.env.PRIV_KEY]);
//

// Calling api
const api = new Api({ rpc, signatureProvider })
//

// Transact account
const account = process.env.ACCOUNT

// Transact authorization
const actor = account
const permission = "active"
const authorization = [{ actor, permission }]

// Transact data
const id = process.env.DATA_ID
const user = account
var data = "INERY JSON-RPC push transaction"
var data = { id, user, data }
//

// TX broadcast sign
const broadcast = true
const sign = true
//

// Function CREATE transaction
async function txCreate(data){
  try{
    var name = "create"
    const create = await api.transact({
      actions:[
        {
          account,
	  name,
	  authorization,
	  data
        }
      ]
    },
    {
      broadcast,
      sign
    })

    console.log(create)
    console.log(create.processed)

  }catch(error){
    console.log(error)
  }
}


// Function READ transaction
async function txRead(data){
  try{
    var name = "read"
    const read = await api.transact({
      actions:[
        {
          account,
	  name,
	  authorization,
	  data
        }
      ]
    },
    {
      broadcast,
      sign
    })

    console.log(read)
    console.log(read.processed)

  }catch(error){
    console.log(error)
  }
}


// Function UPDATE transaction
async function txUpdate(data){
  try{
    var name = "update"
    const update = await api.transact({
      actions:[
        {
          account,
	  name,
	  authorization,
	  data
        }
      ]
    },
    {
      broadcast,
      sign
    })

    console.log(update)
    console.log(update.processed)

  }catch(error){
    console.log(error)
  }
}


// Function DESTROY transaction
async function txDestroy(data){
  try{
    var name = "destroy"
    const destroy = await api.transact({
      actions:[
        {
          account,
	  name,
	  authorization,
	  data
        }
      ]
    },
    {
      broadcast,
      sign
    })

    console.log(destroy)
    console.log(destroy.processed)

  }catch(error){
    console.log(error)
  }
}


// Call all function
async function myTx(data){
  await txCreate(data)
  await txRead(id)
  await txUpdate(data)
  await txDeestroy(id)
}


// Execute push transaction
myTx(data)


