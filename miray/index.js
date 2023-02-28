import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'ineryjs/dist/index.js'
import * as dotenv from 'dotenv'
dotenv.config()

const url = "http://185.249.225.183:8888"

const json_rpc = new JsonRpc(url) 
const privkey = process.env.PRIVKEY
const actor = process.env.ACCOUNT

const account = ""
const signature  = new JsSignatureProvider([privkey]); 

const api = new Api({
    rpc: json_rpc,
    signatureProvider: signature
})

async function transaction(actionName, data, authorization) {
    try {
        const tx = await api.transact({
            actions: [{
                account,
                name: actionName,
                authorization: [{
                    actor,
                    permission: "active"
                }],
                data
            }]
        }, { broadcast: true, sign: true })

        console.log(`${actionName} your transaction details`)
        console.log(tx, "\n")
        console.log("Response :", tx.processed.action_traces[0].console)
        console.log("\n")
    } catch (error) {
        console.log(error)
    }
}

async function main(id, user, data) {
    await transaction("create", { id, user, data }, [{ actor, permission: "active" }])
    await transaction("destroy", { id }, [{ actor, permission: "active" }])
}

main(6100, account, "example transaction from script miray")