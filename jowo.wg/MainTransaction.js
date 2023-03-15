import { Api, JsonRpc, JsSignatureProvider } from "ineryjs";
import dotenv from "dotenv";
dotenv.config();


const url="https://157.245.249.221:8888";// node url or your address ip
const rpc = new JsonRpc(url);

const account = "jowo.wg" // account name on dashboard inery
const actor = "jowo.wg"
const PRIVATE_KEY = "Account_Private_Key"; // user1 private key
const signatureProvider = new JsSignatureProvider([user1PrivateKey]);

const api = new Api ({ rpc : json_rpc, signatureProvider: signature,  });



const CreateTransx = async (id, user, data) => {
  const TheData = { id, user, data };
  try {
    const tx = await api.transact(
      {actions: [ {account, name: "create",authorization: [
      {actor, permission: "active", }, ],
       data: {...TheData, },
          }, ], },
      { broadcast: true, sign: true } );


    console.log("=== CreateTransx Details===")
    console.log(tx, "\n");
    console.log( "The Response data:, ", tx.processed.action_traces[0].console);
  } catch (err) {
    console.log(err);
  }
};

const ReadTransx = async (id) => {
  try {
    const destroyTx = await api.transact(
      { actions:                              [ 
      { account, name: "read", authorization: [
      { actor, permission: "active", },       ],
       data: { id, } },                       ] ,
      },
      { broadcast: true, sign: true }

      );

    console.log("=== ReadTransx Details===");
    console.log(tx, "\n");
    console.log( " The Responses data:, ", tx.processed.action_traces[0].console);
  } catch (err) {
    console.log(err);
  }
};

const MainTransaction = async (id, user, data) => {
  await CreateTransx (id, user, data);
  await ReadTransx (id);
};

MainTransaction (1077, account, "Test Push Transaction on Inery Blockchain" );
