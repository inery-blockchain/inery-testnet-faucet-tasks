import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'ineryjs/dist/index.js'
import * as dotenv from 'dotenv'
dotenv.config()

const { account, node_url, private_key } = process.env;
const actor = account;

const api = new Api({
    rpc: new JsonRpc(node_url),
    signatureProvider: new JsSignatureProvider([private_key])
})

async function push_tx(action, data) {
    try {
        const details_tx = await api.transact({
            actions: [
                {
                    account,
                    name: action,
                    authorization: [
                        {
                            actor,
                            permission: 'active'
                        }
                    ],
                    data
                }
            ]
        }, { broadcast: true, sign: true })
        console.log("=======================================================================")
        console.log("========================= Transaction Details =========================")
        console.log("=======================================================================")
        console.log(details_tx, "\n")
        console.log("Response from contract :", details_tx.processed.action_traces[0].console)
        console.log("\n")
    } catch (error) {
        console.error(error);
    }
}

const actions = async (id, user, data) => {
    await push_tx('create', { id, user, data });
    await push_tx('read', { id });
    await push_tx('update', { id, data });
    await push_tx('destroy', { id });
};

actions(3434, account, "CRUD push transaction")
