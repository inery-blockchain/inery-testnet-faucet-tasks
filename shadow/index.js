const { Api, JsonRpc, RpcError, JsSignatureProvider } = require('ineryjs');
const { inery_url, inery_private_key, inery_account } = require('./inery_config.js');

const inery_actor = inery_account
const rpc = new JsonRpc(node_url);
const signatureProvider = new JsSignatureProvider([node_private_key]);
const api = new Api({rpc,signatureProvider})

const createTransaction = (actionName, data) => ({
    account: inery_account,
    name: actionName,
    authorization: [{ actor: inery_actor, permission: "active" }],
    data,
});

const executeTransaction = async (actionName, data) => {
    const transaction = createTransaction(actionName, data);
    try {
        console.log(await api.transact({ actions: [transaction] }, { broadcast: true, sign: true }));
    } catch (error) {
        console.error(error);
    }
};

const doCreate = async (id, user, data) => {
    const actionData = { id, user, data };
    await executeTransaction('create', actionData);
};

const doDelete = async (id) => {
    const actionData = { id };
    await executeTransaction('destroy', actionData);
};

const doPush = async (id, user, data) => {
    await doCreate(id, user, data);
    await doDelete(id);
};

doPush(2000, inery_account, "Example Push Transcantion Using RPC-API");
