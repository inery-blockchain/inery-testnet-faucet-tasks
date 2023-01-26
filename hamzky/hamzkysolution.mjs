// Import some packages we need
import { Api, JsonRpc, JsSignatureProvider } from "ineryjs";
import dotenv from "dotenv";
dotenv.config();

// Use .env file to keep your data, but right now i keep my private key only
const url = "http://109.123.244.217:8888";
const json_rpc = new JsonRpc(url);
const private_key = process.env.YOUR_OWN_PRIVATE_KEY; // Your private key in Env file will imported here

const account = "hamzky";
const actor = "hamzky";
const signature = new JsSignatureProvider([private_key]);

// Calling API Function
const api = new Api({
  rpc: json_rpc,
  signatureProvider: signature,
});

// Create a Function to Input or Make a New Data, and Call It
const Make_Transaction = async (id, user, data) => {
  const Customer_Data = { id, user, data };
  try {
    const Transaction = await api.transact(
      { actions: [{ account, name: "create", authorization: [{actor,permission: "active"},], data: {...Customer_Data},},],},
      { broadcast: true, sign: true },
    );

    console.log("#######  TRANSACTION DETAILS ####### \n")
    console.log(Transaction, "\n");
    console.log(" The Result", Transaction.processed.action_traces[0].console);
  } catch (error) {
    console.log(error);
  }
};

Make_Transaction(12400, account, "Register a New Data and Push Transaction With RPC API on Inery Blockchain ");
