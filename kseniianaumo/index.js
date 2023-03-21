const { Api, JsonRpc, JsSignatureProvider } = require("ineryjs");
require('dotenv').config();

const get_link = process.env.NODE_URL
const get_rpc = new JsonRpc(get_link)
const privatekey = process.env.PRIVATE_KEY;
const provider = new JsSignatureProvider([privatekey]);
const account_name = process.env.ACCOUNT_NAME
const actor = process.env.ACCOUNT_NAME
const ineryNode = new Api({
    rpc: get_rpc,
    signatureProvider: provider
})

const createTransaction = async (params) => {
    try {
        const txn = await ineryNode.transact({
            actions: [
                {
                    account: account_name,
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

        console.log("=========================Created Transaction===============================");
        console.log(txn);
        console.log("===========================================================================");
    } catch (err) {
        console.log("=============<<<<<<<<<<<error>>>>>>>>>>=================", err)
    }
}

const getTransaction = async (id) => {
    try {
        const txn = await ineryNode.transact({
            actions: [
                {
                    account: account_name,
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

        console.log("=========================Get Transaction===============================");
        console.log("id = ", id);
        console.log(txn);
        console.log("===========================================================================");
    } catch (err) {
        console.log("=============<<<<<<<<<<<error>>>>>>>>>>=================", err)
    }
}

const updateTransaction = async (params) => {
    try {

        const updateTxn = await ineryNode.transact({
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

        console.log("=========================Update Transaction===============================")
        console.log("Txn Id :", updateTxn.processed.id)
        console.log("Block number   :", updateTxn.processed.block_num)
        console.log("===========================================================================")

    } catch (err) {
        console.log("=============<<<<<<<<<<<error>>>>>>>>>>=================", err)
    }
}

const executeTransaction = async (params) => {
    await createTransaction(params);
    await getTransaction(params.id);
    await updateTransaction(params);
};

executeTransaction({ id: 10345679, user: account_name, data: "inery sunnynode" });