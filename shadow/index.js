import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'ineryjs'
import * as dotenv from 'dotenv'
dotenv.config()

const rpc = new JsonRpc(process.env.NODE_IP)
const signatureProvider = new JsSignatureProvider([process.env.PRIVATE_KEY])

const account = process.env.ACCOUNT_ID

const mark = "======================"

const actions = {
  create: {
    name: "create",
    authorization: [{ actor: account, permission: "active" }],
    data: "INERY JSON-RPC push transaction"
  },
  read: {
    name: "read",
    authorization: [{ actor: account, permission: "active" }],
  },
  update: {
    name: "update",
    authorization: [{ actor: account, permission: "active" }],
    data: "INERY JSON-RPC updated transaction"
  },
  destroy: {
    name: "destroy",
    authorization: [{ actor: account, permission: "active" }],
  }
}

const api = new Api({ rpc, signatureProvider })

async function ExecuteTransaction(name) {
  try {
    const action = actions[name]

    const transaction = await api.transact({
      actions: [{
        ...action,
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
    await ExecuteTransaction(name)
  }
}

TransactionDetail()
