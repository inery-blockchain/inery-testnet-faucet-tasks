import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'ineryjs'
import * as dotenv from 'dotenv'
dotenv.config()

const rpc = new JsonRpc(process.env.NODE_IP)
const signatureProvider = new JsSignatureProvider([process.env.PRIVATE_KEY]);

const account = process.env.ACCOUNT_ID

const mark = "======================"

const data = {
  create: {
    id: process.env.DATA_ID,
    user: account,
    data: "INERY JSON-RPC push transaction"
  },
  read: {
    id: process.env.DATA_ID,
    user: account,
  },
  update: {
    id: process.env.DATA_ID,
    user: account,
    data: "INERY JSON-RPC updated transaction"
  },
  destroy: {
    id: process.env.DATA_ID,
    user: account,
  }
}

const actions = {
  create: {
    name: "create",
    authorization: [{ actor: account, permission: "active" }],
  },
  read: {
    name: "read",
    authorization: [{ actor: account, permission: "active" }],
  },
  update: {
    name: "update",
    authorization: [{ actor: account, permission: "active" }],
  },
  destroy: {
    name: "destroy",
    authorization: [{ actor: account, permission: "active" }],
  }
}

const api = new Api({ rpc, signatureProvider })

async function ExecuteTransaction(name, data) {
  try {
    const action = actions[name]
    const transactionData = data[name]

    const transaction = await api.transact({
      actions: [{
        ...action,
        data: transactionData,
      }]
    },
    {
      broadcast: true,
      sign: true,
    })

    console.log("\n\n", mark, `Push transaction ${name.toUpperCase()} details`, mark)
    console.log("\nTransaction Id :", transaction.processed.id)
    console.log("Block number   :", transaction.processed.block_num)
    console.log("Action details :\n")
    console.log(transaction.processed.action_traces[0].act)
  } catch (error) {
    console.log(error.details[0].message)
  }
}

async function TransactionDetail() {
  for (const name in actions) {
    await ExecuteTransaction(name, data)
  }
}

TransactionDetail()
