import { Api, JsonRpc, JsSignatureProvider } from 'ineryjs'
import * as dotenv from 'dotenv'
dotenv.config()

const { account, node_url, private_key } = process.env;
const actor = account;

const rpc_json = new JsonRpc(node_url);
const sign_js = new JsSignatureProvider([private_key]);
const api = new Api({ rpc: rpc_json, signatureProvider: sign_js })

async function destroy_trx(action, data) {
    try {
        const trx = await api.transact({
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
        console.log("================================= Transaction Details =================================")
        console.log(trx, "\n")
        console.log("Details :", trx.processed.action_traces[0].console)
        console.log("\n")
    } catch (error) {
        console.error(error);
    }
}

export async function destroy_task(id) {
    await destroy_trx('destroy', { id });
}
