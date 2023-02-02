import { Api, JsonRpc, JsSignatureProvider } from 'ineryjs/dist/index.js'
import * as dotenv from 'dotenv'

dotenv.config()

const rpc = new JsonRpc(process.env.URL)
const signatureProvider = new JsSignatureProvider([process.env.PRIVATE_KEY])
const api = new Api({ rpc, signatureProvider })
const contract = process.env.INERY_ACCOUNT
const actor = process.env.INERY_ACCOUNT

async function executeCreateRecord(id, user, data) {
  try {
    const tx = await api.transact({
      actions: [{
        account: contract,
        name: 'create',
        authorization: [{
          actor,
          permission: 'active'
        }],
        data: { id, user, data }
      }]
    }, { broadcast: true, sign: true })

    console.log('Create record transaction success:', tx)
  } catch (error) {
    console.error('Create record transaction failed:', error)
  }
}

async function executeDeleteRecord(id) {
  try {
    const tx = await api.transact({
      actions: [{
        account: contract,
        name: 'destroy',
        authorization: [{
          actor,
          permission: 'active'
        }],
        data: { id }
      }]
    }, { broadcast: true, sign: true })

    console.log('Delete record transaction success:', tx)
  } catch (error) {
    console.error('Delete record transaction failed:', error)
  }
}

async function executeCrudTransaction(id, user, data) {
  await executeCreateRecord(id, user, data)
  await executeDeleteRecord(id)
}

executeCrudTransaction(1, process.env.INERY_ACCOUNT, 'CRUD Operation using JSON RPC')
