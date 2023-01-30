import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'ineryjs/dist/index.js'

const rpc = new JsonRpc("http://185.169.252.86:8888");
const signatureProvider = new JsSignatureProvider(["5KLBthkvdpjQVFoRP9rLd4FnTVxXnezvsStG1otbzX4wne73KjD"]);
const api = new Api({ rpc, signatureProvider });

const actor = "mysterious";
const account = "mysterious";

async function create(id, user, data) {
    try {
        const tx = await api.transact({
            actions: [
                {
                    account,
                    name: "create",
                    authorization: [
                        {
                            actor,
                            permission: "active"
                        }
                    ],
                    data: {
                        id, user, data
                    }
                }
            ]
        }, { broadcast: true, sign: true });

        console.log("Transaction successful!");
        console.log("Transaction ID: ", tx.transaction_id);
        console.log("Block Number: ", tx.block_num);
    } catch (error) {
        console.log("Error: ", error);
    }
}

async function read(id) {
    try {
        const tx = await api.transact({
            actions: [
                {
                    account,
                    name: "read",
                    authorization: [
                        {
                            actor,
                            permission: "active"
                        }
                    ],
                    data: {
                        id
                    }
                }
            ]
        }, { broadcast: true, sign: true });

        console.log("Transaction successful!");
        console.log("Transaction ID: ", tx.transaction_id);
        console.log("Block Number: ", tx.block_num);
    } catch (error) {
        console.log("Error: ", error);
    }
}

async function update(id, data) {
    try {
        const tx = await api.transact({
            actions: [
                {
                    account,
                    name: "update",
                    authorization: [
                        {
                            actor,
                            permission: "active"
                        }
                    ],
                    data: {
                        id, data
                    }
                }
            ]
        }, { broadcast: true, sign: true });

        console.log("Transaction successful!");
        console.log("Transaction ID: ", tx.transaction_id);
        console.log("Block Number: ", tx.block_num);
    } catch (error) {
        console.log("Error: ", error);
    }
}

async function destroy(id) {
    try {
        const tx = await api.transact({
            actions: [
                {
                    account,
                    name: "destroy",
                    authorization: [
                        {
                            actor,
                            permission: "active"
                        }
                    ],
                    data
