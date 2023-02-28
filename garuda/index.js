import { Api, JsonRpc, JsSignatureProvider } from'ineryjs'
import dotenv from'dotenv'
dotenv.config()

const { NODE_URL, PRIV_KEY, ID, ACCOUNT } = process.env

const api = new Api({
  rpc: new JsonRpc(NODE_URL),
  signatureProvider: new JsSignatureProvider([PRIV_KEY])
})

const abi = await api.getAbi(ACCOUNT, true)

async function create() {
  try{
    const tx = api.buildTransaction()
    tx.with(ACCOUNT).as(ACCOUNT).create(...Object.values({ id: ID, ACCOUNT, data: 'GARUDA' }))
    console.log(await tx.send())
  }
  catch(error){
     console.error(error)
  }
}

async function destroy() {
  try{
    const tx = api.buildTransaction()
    tx.with(ACCOUNT).as(ACCOUNT).destroy(...Object.values({ id: ID }))
    console.log(await tx.send())
  }
  catch(error){
     console.error(error)
  }
}

(async () => {
  await create()
  await destroy()
})()
