import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'ineryjs'
import dotenv from 'dotenv'

dotenv.config()

const url = process.env.NODE_URLS
const rpc = new JsonRpc(url)

const privateKey = process.env.PRIVATE_KEYS
const accountName = process.env.INERY_NAMES
const signatureProvider = new JsSignatureProvider([privateKey])

const account = accountName
const actions = [
  {
    account,
    name: 'create',
    authorization: [
      {
        actor: accountName,
        permission: 'active'
      }
    ],
    data: {
      id,
      user,
      data
    }
  },
  {
    account,
    name: 'destroy',
    authorization: [
      {
        actor: accountName,
        permission: 'active'
      }
    ],
    data: {
      id
    }
  }
]

const api = new Api({ rpc, signatureProvider })

async function transact(actions) {
  try {
    const tx = await api.transact({ actions }, { broadcast: true, sign: true })

    console.log('=======================================================================')
    console.log('=================== TRANSACTION INFORMATION ====================')
    console.log('=======================================================================')
    console.log(tx, '\n')
    console.log('Response from contract :', tx.processed.action_traces[0].console)
    console.log('\n')
  } catch (error) {
    console.log(error)
  }
}

async function main(id, user, data) {
  await transact(actions)
}

main(1, account, 'INERY TESTNET TASK4 BY RIZAL42')
