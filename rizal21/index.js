const { Api, JsonRpc, JsSignatureProvider } = require('ineryjs')
const dotenv = require('dotenv')
const readline = require('readline')
dotenv.config()

const rpc = new JsonRpc('NODE_URL')
const signatureProvider = new JsSignatureProvider(['PRIV_KEY'])

const api = new Api({ rpc, signatureProvider })
const account = ACCOUNT
const authorization = [{ actor: account, permission: 'active' }]

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question('Masukkan aksi yang ingin dilakukan (create/read/update/destroy): ', async (action) => {
  if (['create', 'read', 'update', 'destroy'].includes(action)) {
    const dataId = await askDataId()
    const data = await askData()
    await pushTransaction(action, { id: dataId, user: account, data })
  } else {
    console.error('Aksi yang dimasukkan tidak valid.')
    rl.close()
  }
})

async function askDataId() {
  return new Promise((resolve) => {
    rl.question('Masukkan DATA_ID (hanya angka >= 1): ', (dataId) => {
      if (!isNaN(parseInt(dataId)) && parseInt(dataId) >= 1) {
        resolve(parseInt(dataId))
      } else {
        console.error('DATA_ID harus berupa angka dan lebih besar dari atau sama dengan 1.')
        rl.close()
      }
    })
  })
}

async function askData() {
  return new Promise((resolve) => {
    rl.question('Masukkan data: ', (data) => {
      resolve(data)
    })
  })
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
