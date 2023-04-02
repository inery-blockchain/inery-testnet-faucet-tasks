const { Api, JsonRpc, JsSignatureProvider } = require("ineryjs");
require('dotenv').config();

const url = process.env.NODE_URL
const link_rpc = new JsonRpc(url)
const privatekey = process.env.PRIVATE_KEY;
const provider = new JsSignatureProvider([privatekey]);
const account = process.env.ACCOUNT
const actor = process.env.ACCOUNT
const api_node = new Api({
    rpc: link_rpc,
    signatureProvider: provider
})

const createtx = async (params) => {
    try {
        const ctx = await api_node.transact({
            actions: [
                {
                    account: account,
                    name: 'create',
                    authorization: [{ actor, permission: 'active' }],
                    data: {
                        id: params.id,
                        user: params.user,
                        data: params.data
                    },
                },
            ]
        }, {
            broadcast: true,
            sign: true
        })

        console.log("Create Transaction");
        console.log(txn);
    } catch (err) {
        console.log("error", err)
    }
}

const readtx = async (id) => {
    try {
        const rtx = await api_node.transact({
            actions: [
                {
                    account: account,
                    name: 'read',
                    authorization: [{ actor, permission: 'active' }],
                    data: {
                        id
                    },
                },
            ]
        }, {
            broadcast: true,
            sign: true
        })

        console.log("Read Transaction");
        console.log("id = ", id);
        console.log(txn);
    } catch (err) {
        console.log("error", err)
    }
}

const updatetx = async (params) => {
    try {

        const utx = await api_node.transact({
            actions: [
                {
                    account,
                    name: "update",
                    authorization: [{ actor, permission: 'active' }],
                    data: { ...params }
                }
            ]
        }, {
            broadcast: true,
            sign: true
        })

        console.log("txhash:", updateTxn.processed.id)
        console.log("blockid:", updateTxn.processed.block_num)

    } catch (err) {
        console.log("error", err)
    }
}



const pushtx = async (params) => {
    await createtx(params);
    await readtx(params.id);
    await updatetx(params);
};

pushtx({ id: 76, user: account, data: "Push Transaction using IneryJS" });