const { Api, JsonRpc, JsSignatureProvider } = require('ineryjs')
const dotenv = require('dotenv')
const readline = require('readline')

dotenv.config()
const env = process.env

const rpc = new JsonRpc(env.NODE_URL)
const signatureProvider = new JsSignatureProvider([env.PRIV_KEY])
const api = new Api({ rpc, signatureProvider })

const account = env.ACCOUNT
const authorization = [{ actor: account, permission: 'active' }]

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question('Masukkan aksi yang ingin dilakukan (create/read/update/destroy): ', async (action) => {
  if (['create', 'read', 'update', 'destroy'].includes(action)) {
    const dataId = await askUserInput('DATA_ID', 'Masukkan DATA_ID (hanya angka >= 1): ', validateDataId)
    const data = await askUserInput('data', 'Masukkan data: ')
    await pushTransaction(action, { id: dataId, user: account, data })
  } else {
    console.error('Aksi yang dimasukkan tidak valid.')
    rl.close()
  }
})

async function askUserInput(key, question, validator) {
  return new Promise((resolve) => {
    rl.question(question, (value) => {
      if (validator && !validator(value)) {
        console.error(`${key} harus sesuai dengan kriteria yang dijelaskan.`)
        rl.close()
      } else {
        resolve(value)
      }
    })
  })
}

function validateDataId(dataId) {
  return !isNaN(parseInt(dataId)) && parseInt(dataId) >= 1
}

async function pushTransaction(name, data) {
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
    });

    console.log(`Action detail:\n`, result.processed.action_traces[0])

  } catch (error) {
    console.error(`Error executing ${name.toUpperCase()} transaction: ${error.details[0].message}`)
  } finally {
    rl.close()
  }
}
