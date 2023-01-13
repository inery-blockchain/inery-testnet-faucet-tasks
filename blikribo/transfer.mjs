import { Api, JsonRpc, RpcError, JsSignatureProvider } from '../dist/index.js'
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

// our Node URL, when we first setup our node, inery has created our RPC in port :8888
// check it on your node, /inery-node/inery.setup/tools/config.json HTTP_ADDRESS key
const url = process.env.NODE_URL

const json_rpc = new JsonRpc(url) // create new JsonRPC using our node url
const private_key = process.env.PRIVATE_KEY; // private key

const account = process.env.INERY_ACCOUNT // Inery Smart Contract Account to Call
const actor = process.env.INERY_ACCOUNT // The Signer, should match with your provided Private Key
const signature  = new JsSignatureProvider([private_key]); // creating Signer from private key

// calling API
const api = new Api({
    rpc: json_rpc,
    signatureProvider: signature
})

//function to transfer tokens
const transfer = async () => {
  const result = await api.transact({
    actions: [
      {
        account: "inery.token",
        name: "transfer",
        authorization: [
          {
            actor: "blikribo",
            permission: "active",
          },
        ],
        data: {
          from: "blikribo",
          to: "inery",
          quantity: "1 BLKRB",
          memo: "Send test token",
        },
      },
    ],
  });
  console.log(result);
  console.log(result.processed.action_traces[0]);
};

transfer();

