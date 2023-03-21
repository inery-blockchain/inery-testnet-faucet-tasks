const { Api, JsonRpc, RpcError, JsSignatureProvider } = require('ineryjs');
const user1PrivateKey = "PRIVATE_KEY"; // user1 private key
const signatureProvider = new JsSignatureProvider([user1PrivateKey]);

const account = "goon.dobel" // input your account name inery 
const actor = "goondbb"

const url= "https://IP:8888"; // input your IP NODE 
const rpc = new JsonRpc(url);

const api = new Api
( { rpc, signatureProvider });



const krete = async (id, user, data) => {
  try {
    const tax = await Userapi.transact(
      {
        actions: [
          {
            account,
            name: "create",
            authorization: [
              {
                actor,
                permission: "active",
              },  ],  data: 
              { id, user,data },
          }, ],    },
      { broadcast: true, sign: true }
    );

    console.log(result);
  } catch (err) {
    console.log(err);
  } };
  
  

const readies = async (id) => {
  try {
    const tax = await Userapi.transact(
      {
        actions: [
          {
            account,
            name: "read",
            authorization: [
              {
                actor,
                permission: "active",
              },  ],  data: 
              { id },
          }, ],    },
      { broadcast: true, sign: true }
    );

    console.log(result);
  } catch (err) {
    console.log(err);
  } };

 const maen = async (id, user, data) => {
  await krete  (id, user, data);
  await readies  (id);
};

maen ( 222000, account , " transaction with RPC JSON on Inery Blockchain" ) 
