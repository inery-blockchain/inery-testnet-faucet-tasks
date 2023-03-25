import { Api, JsonRpc, JsSignatureProvider } from 'ineryjs'
import dotenv from 'dotenv'

dotenv.config()

const { NODE_URL, PRIV_KEY, ID, ACCOUNT } = process.env

const api = new Api({
  rpc: new JsonRpc(NODE_URL),
  signatureProvider: new JsSignatureProvider([PRIV_KEY])
})

const abi = await api.getAbi(ACCOUNT, true)

async function sendTransaction(action, data) {
  try {
    const tx = api.buildTransaction()
    tx.with(ACCOUNT).as(ACCOUNT)[action](...Object.values(data))
    console.log(await tx.send())
  } catch (error) {
    console.error(error)
  }
}

(async () => {
  await sendTransaction('create', { id: ID, ACCOUNT, data: 'okandgrmc' })
  await sendTransaction('destroy', { id: ID })
})()
