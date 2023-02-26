import { Api, JsonRpc, RpcError, JsSignatureProvider } from "../dist/index.js";
import * as dotenv from "dotenv";
dotenv.config();

const url = process.env.NODE_URL
const json_rpc = new JsonRpc(url)

const private_key = process.env.PRIVATE_KEY
const account = process.env.INERY_ACCOUNT
const actor = process.env.INERY_ACCOUNT

const signature  = new JsSignatureProvider([private_key])
const api = new Api({ rpc: json_rpc, signatureProvider: signature })

async function create(id, user, data) {
    try {
        const tx = await api.transact(
      {
        actions: [{
            "account": account,
            "name": "create",
            "authorization": [{
                "actor": actor,
                "permission": "active"
            }],
            "data": {
                "id": id,
                "user": user,
                "data": data
            }
        }],
       }, {broadcast:true, sign:true})

    console.log("////////////////////////////////////////")
    console.log("===========> CREATE DETAIL <============")
    console.log("////////////////////////////////////////")

    console.log(tx, "\n")
    console.log("Response from contract :", tx.processed.action_traces[0].console)
  } catch (error) {
    console.log(error)
  }
}

async function read(id) {
    try {
        const tx = await api.transact(
      {
        actions: [{
            "account": account,
            "name": "read",
            "authorization": [{
                "actor": actor,
                "permission": "active"
            }],
            "data": {
                "id": id
            }
        }],
       }, {broadcast:true, sign:true})

    console.log("////////////////////////////////////////")
    console.log("============> READ DETAIL <=============")
    console.log("////////////////////////////////////////")

    console.log(tx, "\n")
    console.log("Response from contract :", tx.processed.action_traces[0].console)
  } catch (error) {
    console.log(error)
  }
}

async function destroy(id, user) {
    try {
        const tx = await api.transact(
      {
        actions: [{
            "account": account,
            "name": "destroy",
            "authorization": [{
                "actor": actor,
                "permission": "active"
            }],
            "data": {
                "id": id,
                "user": user,
            }
        }],
       }, {broadcast:true, sign:true})

    console.log("////////////////////////////////////////")
    console.log("===========> DESTROY DETAIL <===========")
    console.log("////////////////////////////////////////")

    console.log(tx, "\n")
    console.log("Response from contract :", tx.processed.action_traces[0].console)
  } catch (error) {
    console.log(error)
  }
}

async function main(id, user, data){
    await create(id, user, data)
    await read(id)
    await destroy(id, user)
}

main(5, account, "Get New Data From RPC")
