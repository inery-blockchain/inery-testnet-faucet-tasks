import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'ineryjs';
const url= "https://198.211.105.127:8888" // input your node url or ip


const user1PrivateKey = "YOUR_PRIVATE_KEY"; // input your private key 
const account = "goon.dobel"
const actor = "goon.dobel"

const rpc = new JsonRpc(url);
const signatureProvider = new JsSignatureProvider([user1PrivateKey]);

// Calling API
const api = new Api(
{ rpc: json_rpc,signatureProvider: signature})


// New transact

 const goTransaksi = async (id, user, data) => {
  const goData = { id, user, data };
  try {
    const tx = await api.transact(
      {actions: [ {account, name: "create",authorization: [
      {actor, permission: "active", }, ],
       data: {...goData, },
          }, ], },
      { broadcast: true, sign: true } );


    console.log("=== GO TRANSAKSI Details===")
    console.log(tx, "\n");
    console.log( "The Response data:, ", tx.processed.action_traces[0].console);
  } catch (err) {
    console.log(err);
  }
};

const readT = async (id) => {
  try {
    const destroyTx = await api.transact(
      { actions:                              [ 
      { account, name: "read", authorization: [
      { actor, permission: "active", },       ],
       data: { id, } },                       ] ,
      },
      { broadcast: true, sign: true }

      );

    console.log("=== Read Transaction Details===");
    console.log(tx, "\n");
    console.log( " The Responses data:, ", tx.processed.action_traces[0].console);
  } catch (err) {
    console.log(err);
  }
};

const pushTrans = async (id, user, data) => {
  await goTransaksi (id, user, data);
  await readT (id);
};

pushTrans (10999, account, "Sample Push Transaction via JSON RPC " );
