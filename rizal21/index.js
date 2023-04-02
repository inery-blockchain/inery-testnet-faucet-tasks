const { Api, JsonRpc, JsSignatureProvider } = require('ineryjs')
const dotenv = require('dotenv')
const readline = require('readline')

dotenv.config()
const envVars = process.env

const rpc = new JsonRpc(envVars.NODE_URL)
const signatureProvider = new JsSignatureProvider([envVars.PRIV_KEY])

const api = new Api({ rpc, signatureProvider })
const account = envVars.ACCOUNT
const authorization = [{ actor: account, permission: 'active' }]

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question('Silakan pilih tindakan yang ingin dilakukan (create/read/update/delete): ', async (action) => {
  if (['create', 'read', 'update', 'delete'].includes(action)) {
    const dataId = await promptDataId()
    const data = await promptData()
    await pushTransaction(action, { id: dataId, user: account, data })
  } else {
    console.error('Tindakan yang dimasukkan tidak valid.')
    rl.close()
  }
})

async function promptDataId() {
  return new Promise((resolve) => {
    rl.question('Masukkan ID Data (hanya angka >= 1): ', (dataId) => {
      if (!isNaN(parseInt(dataId)) && parseInt(dataId) >= 1) {
        resolve(parseInt(dataId))
      } else {
        console.error('ID Data harus berupa angka dan lebih besar dari atau sama dengan 1.')
        rl.close()
      }
    })
  })
}

async function promptData() {
  return new Promise((resolve) => {
    rl.question('Masukkan data: ', (data) => {
      resolve(data)
    })
  })
}

async function pushTransaction(actionName, data) {
  try {
    const result = await api.transact({
      actions: [
        {
          account,
          name: actionName,
          authorization,
          data
        }
      ]
    });

    console.log(`Detail tindakan:\n`, result.processed.action_traces[0])

  } catch (error) {
    console.error(`Terjadi kesalahan saat menjalankan transaksi ${actionName.toUpperCase()}: ${error.details[0].message}`)
  } finally {
    rl.close()
  }
}
