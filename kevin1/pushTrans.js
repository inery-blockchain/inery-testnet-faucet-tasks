const { Api, JsonRpc, RpcError } = require('ineryjs');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');
const { PrivateKey, PublicKey } = require('eosjs/dist/eosjs-keyconversions');

const privateKey = "YOUR_PRIVATE_KEY";
const signatureProvider = new JsSignatureProvider([privateKey]);
const rpc = new JsonRpc("http://165.232.82.180:8888", { fetch });
const api = new Api({ rpc, signatureProvider });

const account = "your_contract_account";
const actor = "your_account_name";

const pushTransaction = async (action) => {
    try {
        const response = await api.transact({
            actions: [{
                account: account,
                name: "kevin1",
                authorization: [{
                    actor: actor,
                    permission: "active"
                }],
                data: action
            }]
        }, {
            blocksBehind: 3,
            expireSeconds: 30,
        });
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}

const actionData = {
    id: "10543230",
    user: "kevin1",
    data: "inery task4"
};

pushTransaction(actionData);
