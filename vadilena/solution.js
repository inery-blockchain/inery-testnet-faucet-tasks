import { Api, JsonRpc, JsSignatureProvider } from 'ineryjs'
import * as dotenv from 'dotenv'
dotenv.config()

const { account, node_url, private_key } = process.env;
const actor = account;

const rpc_json = new JsonRpc(node_url);
const sign_js = new JsSignatureProvider([private_key]);
const inery_api = new Api({ rpc: rpc_json, signatureProvider: sign_js })
async function push_trx(action, data) {
    try {
        const details_trx = await inery_api.transact({
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
        console.log(details_trx, "\n")
        console.log("Details :", details_trx.processed.action_traces[0].console)
        console.log("\n")
    } catch (error) {
        console.error(error);
    }
}

async function create_trx(id, user, data) {
    await push_trx('create', { id, user, data });
}
async function destroy_trx(id) {
    await push_trx('destroy', { id });
}
const main = async (id) => {
    console.log("waiting transaction...\n");
    create_trx(id, account, "test create data");
    destroy_trx(id);
}

main(262)