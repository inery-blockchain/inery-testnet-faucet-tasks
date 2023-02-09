import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'ineryjs'
import * as dotenv from 'dotenv'
dotenv.config()

// Api configuration
const rpc = new JsonRpc(process.env.NODE_IP)
const signatureProvider = new JsSignatureProvider([process.env.PRIVATE_KEY]);
//

// Calling api
const api = new Api({ rpc, signatureProvider })
//

// Transact account
const account = process.env.ACCOUNT_ID

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

const mark = "======================"

// Function CREATE transaction
async function CreateTXDetail(data){
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

    console.log("\n\n", mark, "Push transaction CREATE details", mark)
    console.log("\nTransaction Id :", create.processed.id)
    console.log("Block number   :", create.processed.block_num)
    console.log("Action details :\n")
    console.log(create.processed.action_traces[0].act)

  }catch(error){
    console.log(error.details[0].message)
  }
}


// Function READ transaction
async function ReadTXDetail(data){
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

    console.log("\n\n", mark, "Push transaction READ details", mark)
    console.log("\nTransaction Id :", read.processed.id)
    console.log("Block number   :", read.processed.block_num)
    console.log("Action details :\n")
    console.log(read.processed.action_traces[0].act)

  }catch(error){
    console.log(error.details[0].message)
  }
}


// Function UPDATE transaction
async function UpdateTXDetail(data){
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

    console.log("\n\n", mark, "Push transaction UPDATE details", mark)
    console.log("\nTransaction Id :", update.processed.id)
    console.log("Block number   :", update.processed.block_num)
    console.log("Action details :\n")
    console.log(update.processed.action_traces[0].act)

  }catch(error){
    console.log(error.details[0].message)
  }
}


// Function DESTROY transaction
async function DestroyTXDetail(data){
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

    console.log("\n\n", mark, "Push transaction DESTROY details", mark)
    console.log("\nTransaction Id :", destroy.processed.id)
    console.log("Block number   :", destroy.processed.block_num)
    console.log("Action details :\n")
    console.log(destroy.processed.action_traces[0].act)

  }catch(error){
    console.log(error.details[0].message)
  }
}


// Call all function
async function TransactionDetail(data){
  await CreateTXDetail(data)
  await ReadTXDetail(data)
  await UpdateTXDetail(data)
  await DestroyTXDetail(data)
}


// Execute push transaction
TransactionDetail(data)
