import { Api, JsonRpc, JsSignatureProvider } from "ineryjs";
import dotenv from "dotenv";
dotenv.config();

// Your Node IP
const url = "http://38.242.254.103:8888";

// Set Up
const json_rpc = new JsonRpc(url);
const account = "msamanahce";
const actor = "msamanahce";
const signature = new JsSignatureProvider([process.env.PRIVATE_KEY]);

//Calling API
const Userapi = new Api({
  rpc: json_rpc,
  signatureProvider: signature,
});

export { Userapi, account, actor };
