import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'ineryjs/dist/index.js'
import * as dotenv from 'dotenv'
dotenv.config()


const url = "http://YOUR.IP:8888" 
const private_key = process.env.PRIVATE_KEY 

const account = "goon.dobel" 
const actor = "goondbb"

const json_rpc = new JsonRpc (process.env.INERY_NODE_RPC)
const signature  = new JsSignatureProvider ([process.env.INERY_PRIV_KEY]);

// Request API 
const api = new Api({
    rpc: json_rpc,
    signatureProvider: signature
})



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
