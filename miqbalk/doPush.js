const { Api, JsonRpc, RpcError, JsSignatureProvider } = require('ineryjs');
const { node_url, node_private_key, node_account } = require('./node_config.js');

const node_actor = node_account
const rpc = new JsonRpc(node_url);
const signatureProvider = new JsSignatureProvider([node_private_key]);
const api = new Api({rpc,signatureProvider})

const doCreate = async (id, user, data) => {
     try{
         console.log(await api.transact({
                 actions:[
                     {
                         account:node_account,
                         name:"create",
                         authorization:[
                             {
                                 actor:node_actor,
                                 permission:"active"
                             }
                         ],
                         data:{ id, user, data }
                     }
                 ]
         },{broadcast:true,sign:true}));
     }
     catch(error){
         console.error(error);
     }
};
const doDelete = async (id) => {
    try{
         console.log(await api.transact({
                 actions:[
                     {
                         account:node_account,
                         name:"destroy",
                         authorization:[
                             {
                                 actor:node_actor,
                                 permission:"active"
                             }
                         ],
                         data:{ id }
                     }
                 ]
         },{broadcast:true,sign:true}));
     }
     catch(error){
         console.error(error);
     }
};

const doPush = async (id, user, data) => {
    await doCreate(id, user, data)
    await doDelete(id)
};

doPush(2000, node_account, "Example Push Transcantion Using RPC-API")
