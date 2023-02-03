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


async function main({ id, user, data }) {
    await create(id, user, data)
}

main({ id: 1, user: "simple push data", data: "99987665" })