import {
    Api,
    JsonRpc,
    RpcError,
    JsSignatureProvider
} from 'ineryjs/dist/index.js'
import * as dotenv from 'dotenv'
dotenv.config()

const url = "http://84.54.23.49"
const jsonRpc = new JsonRpc(url)
const privateKey = process.env.PRIVATE_KEY;

const account = process.env.INERY_ACCOUNT
const actor = process.env.INERY_ACCOUNT
const signature = new JsSignatureProvider([privateKey]);

const api = new Api({
    rpc: jsonRpc,
    signatureProvider: signature
})

async function create(id, user, data) {
    try {
        const tx = await api.transact({
            actions: [{
                account,
                name: "create",
                authorization: [{
                    actor,
                    permission: "active"
                }],
                data: {
                    id,
                    user,
                    data
                }
            }]
        }, {
            broadcast: true,
            sign: true
        })



        console.log(tx, "\n")
        console.log("Response from contract :", tx.processed.action_traces[0].console)
        console.log("\n")
    } catch (error) {
        console.log(error)
    }
}

async function read(id) {
    try {
        const tx = await api.transact({
            actions: [{
                account,
                name: "read",
                authorization: [{
                    actor,
                    permission: "active"
                }],
                data: {
                    id
                }
            }]
        }, {
            broadcast: true,
            sign: true
        })


        console.log(tx, "\n")
        console.log("Response from contract :", tx.processed.action_traces[0].console)
        console.log("\n")
    } catch (error) {
        console.log(error)
    }
}

async function update(id, data) {
    try {
        const tx = await api.transact({
            actions: [{
                account,
                name: "update",
                authorization: [{
                    actor,
                    permission: "active"
                }],
                data: {
                    id,
                    data
                }
            }]
        }, {
            broadcast: true,
            sign: true
        })

        console.log(tx, "\n")
        console.log("Response from contract :", tx.processed.action_traces[0].console)
        console.log("\n")
    } catch (error) {
        console.log(error)
    }
}

async function destroy(id) {
    try {
        const tx = await api.transact({
            actions: [{
                account,
                name: "destroy",
                authorization: [{
                    actor,
                    permission: "active"
                }],
                data: {
                    id
                }
            }]
        }, {
            broadcast: true,
            sign: true
        })


        console.log(tx, "\n")
        console.log("Response from contract :", tx.processed.action_traces[0].console)
        console.log("\n")
    } catch (error) {
        console.log(error)
    }
}


async function main(id, user, data) {
    await create(id, user, data)
    await read(id)
    await update(id, data)
    await destroy(id)
}

main(1, account, "CRUD Transaction via JSON RPC")