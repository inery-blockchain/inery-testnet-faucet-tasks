import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'ineryjs'
import * as dotenv from 'dotenv'
dotenv.config()

const rpc = new JsonRpc(process.env.NODE_URL)
const signatureProvider = new JsSignatureProvider([process.env.PRIV_KEY])
const api = new Api({ rpc, signatureProvider })
const account = process.env.ACCOUNT
const id = 1000
const data = "INERY JSON-RPC CRUD push transaction"

await api.getAbi(account, true)

async function createData() {
  try {
    const result = await api.transact({
      actions: [api.with(account).as(account).create(id, account, data)]
    })
    console.log(result.processed.action_traces[0].act.name)
    console.log(result.processed.action_traces[0].console)
    console.log(result.processed.action_traces[0])
  } catch (error) {
    console.error(error)
  }
}

async function readData() {
  try {
    const result = await api.transact({
      actions: [api.with(account).as(account).read(id)]
    })
    console.log(result.processed.action_traces[0].act.name)
    console.log(result.processed.action_traces[0].console)
    console.log(result.processed.action_traces[0])
  } catch (error) {
    console.error(error)
  }
}

async function updateData() {
  try {
    const result = await api.transact({
      actions: [api.with(account).as(account).update(id, data)]
    })
    console.log(result.processed.action_traces[0].act.name)
    console.log(result.processed.action_traces[0].console)
    console.log(result.processed.action_traces[0])
  } catch (error) {
    console.error(error)
  }
}

async function deleteData() {
  try {
    const result = await api.transact({
      actions: [api.with(account).as(account).destroy(id)]
    })
    console.log(result.processed.action_traces[0].act.name)
    console.log(result.processed.action_traces[0].console)
    console.log(result.processed.action_traces[0])
  } catch (error) {
    console.error(error)
  }
}

createData()
readData()
updateData()
deleteData()

