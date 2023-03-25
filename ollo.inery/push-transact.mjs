const env = process.env
import { Api, JsonRpc, JsSignatureProvider } from 'ineryjs'
import dotenv from 'dotenv'
dotenv.config()

const rpc = new JsonRpc(env.NODE_URL)
const signatureProvider = new JsSignatureProvider([env.PRIV_KEY])

const api = new Api({ rpc, signatureProvider })
const account = env.ACCOUNT
const authorization = [{ actor: account, permission: 'active' }]
const data = { id: env.DATA_ID, user: account, data: 'INERY JSON-RPC push transaction' }
const actions = ['create', 'read', 'update', 'destroy']

async function pushTransaction(name) {
  try {
    const result = await api.transact({
      actions: [
        {
          account,
          name,
          authorization,
          data
        }
      ]
    }, { broadcast: true, sign: true })

    console.log(`\n${name.toUpperCase()} transaction details:`)
    console.log(`Transaction ID: ${result.processed.id}`)
    console.log(`Block number: ${result.processed.block_num}`)
    console.log(`Action detail:\n`, result.processed.action_traces[0].act)

  } catch (error) {
    console.error(`Error executing ${name.toUpperCase()} transaction: ${error.details[0].message}`)
  }
}

async function pushAllTransactions() {
  for (const action of actions) {
    await pushTransaction(action)
  }
}

pushAllTransactions()


