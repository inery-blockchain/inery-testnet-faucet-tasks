import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'ineryjs/dist/index.js'
import * as dotenv from 'dotenv'

dotenv.config()

const rpc = new JsonRpc(process.env.URL)
const signatureProvider = new JsSignatureProvider([process.env.PRIVATE_KEY])
const api = new Api({ rpc, signatureProvider })
const contract = process.env.INERY_ACCOUNT
const actor = process.env.INERY_ACCOUNT

async function createRecord(id, user, data) {
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

    console.log('Transaction successful:', tx)
  } catch (error) {
    console.error('Transaction failed:', error)
  }
}

async function deleteRecord(id) {
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

    console.log('Transaction successful:', tx)
  } catch (error) {
    console.error('Transaction failed:', error)
  }
}

async function main(id, user, data) {
  await createRecord(id, user, data)
  await deleteRecord(id)
}

main(1, process.env.INERY_ACCOUNT, 'CRUD Transaction via JSON RPC')