import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'ineryjs/dist/index.js'
import * as dotenv from 'dotenv'

dotenv.config()

const rpc = new JsonRpc(process.env.URL)
const signatureProvider = new JsSignatureProvider([process.env.PRIVATE_KEY])
const api = new Api({ rpc, signatureProvider })
const contract = process.env.INERY_ACCOUNT
const actor = process.env.INERY_ACCOUNT

async function sendTransaction(actionName, data) {
  try {
    const tx = await api.transact({
      actions: [{
        account: contract,
        name: actionName,
        authorization: [{
          actor,
          permission: 'active'
        }],
        data
      }]
    }, { broadcast: true, sign: true })

    console.log('Transaction successful:', tx)
  } catch (error) {
    console.error('Transaction failed:', error)
  }
}

async function createRecord(id, user, data) {
  await sendTransaction('create', { id, user, data })
}

async function deleteRecord(id) {
  await sendTransaction('destroy', { id })
}

async function main(id, user, data) {
  await createRecord(id, user, data)
  await deleteRecord(id)
}

main(1, process.env.INERY_ACCOUNT, 'CRUD Transaction via JSON RPC')
