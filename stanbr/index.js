const dotenv = require('dotenv');
dotenv.config();
const { Api, JsonRpc, JsSignatureProvider } = require('ineryjs');

const jsonRpc = new JsonRpc(process.env.NODE_URL);
const privateKey = process.env.PRIVATE_KEY;

const account = process.env.INERY_ACCOUNT;
const actor = process.env.INERY_ACCOUNT;
const signature = new JsSignatureProvider([privateKey]);

const api = new Api({
    rpc: jsonRpc,
    signatureProvider: signature
});
let authorizationObject = {
    actor,
    permission: "active"
}

async function transactionObject({ action, data }) {
    try {
        return await api.transact({
            actions: [
                {
                    account,
                    name: action,
                    authorization: [authorizationObject],
                    data
                },
                { broadcast: true, sign: true }
            ]
        });
    } catch (error) {
        throw Error(error);
    }
}


function loggingTransaction({ transaction, transactionInfo }) {
    console.log("=======================================================================")
    console.log(`===================== ${transaction} transaction details =====================`)
    console.log("=======================================================================")
    console.log(transactionInfo, "\n")
    console.log("Response from contract :", transactionInfo.processed.action_traces[0].console)
    console.log("\n")
}


async function create({ id, user, data }) {
    try {
        const txInfo = await transactionObject({ action: 'create', data: { id, user, data } });
        loggingTransaction({ transaction: "CREATE", transactionInfo: txInfo });
    } catch (error) {
        console.log(error)
    }
}

async function read({ id }) {
    try {
        const transactionInfo = await transactionObject({ action: "read", data: { id } });
        loggingTransaction({ transaction: "READ", transactionInfo });
    } catch (error) {
        console.log(error)
    }
}

async function update({ id, data }) {
    try {
        const transactionInfo = await transactionObject({ action: "update", data: { id, data } });
        loggingTransaction({ transaction: "UPDATE", transactionInfo });
    } catch (error) {
        console.log(error)
    }
}

async function destroy({ id }) {
    try {
        const transactionInfo = await transactionObject({ action: "destroy", data: { id } });
        loggingTransaction({ transaction: "DESTROY", transactionInfo });
    } catch (error) {
        console.log(error)
    }
}

async function main({ id, user, data }) {
    await create(id, user, data)
    await read(id)
    await update(id, data)
    await destroy(id)
}

main({ id: 1, user: account, data: "99987665" })