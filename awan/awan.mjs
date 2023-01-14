import { Api, JsonRpc, RpcError, JsSignatureProvider } from '../dist/index.js'
import * as dotenv from 'dotenv';
dotenv.config();

// our Node URL, when we first setup our node, inery has created our RPC in port :8888
// check it on your node, /inery-node/inery.setup/tools/config.json HTTP_ADDRESS key
// check in .env / .env-cth
const url = process.env.NODE_URL

const json_rpc = new JsonRpc(url) // create new JsonRPC using our node url
const private_key = process.env.PRIVATE_KEY; // private key account inery

const account = process.env.INERY_ACCOUNT // Name account inery ( check in testnet.inery.io )
const actor = process.env.INERY_ACCOUNT // The Signer, should match with your provided Private Key
const sign  = new JsSignatureProvider([private_key]); // creating Signer from private key

// calling API
const api = new Api({
    rpc: json_rpc,
    signatureProvider: sign
})


async function CreateAwan(id, user, data){
    try{
        // create new transaction and sign it
        const tx = await api.transact({
            actions:[
                {
                    account,
                    name:"create",
                    authorization:[
                        {
                            actor,
                            permission:"active"
                        }
                    ],
                    data:{
                        id, user, data
                    }
                }
            ]
        },{broadcast:true,sign:true})

        console.log(tx) // output
        console.log(tx.processed.action_traces[0].console)
    }catch(error){
        console.log(error)
    }
};


const LookTransaction = async (id) => {
  try {
    const lookId = await api.transact(
      {
        actions: [
          {
            account,
            name: "look",
            authorization: [
              {
                actor,
                permission: "active",
              },
            ],
            data: {
              id,
            },
          },
        ],
      },
      { broadcast: true, sign: true }
    );
    console.log(lookId);
  } catch (error) {
    console.log(error);
  }
};

const CrushTrancsaction = async (id) => {
  try {
    const destroyTx = await api.transact(
      {
        actions: [
          {
            account,
            name: "Crush",
            authorization: [
              {
                actor,
                permission: "active",
              },
            ],
            data: {
              id,
            },
          },
        ],
      },
      { broadcast: true, sign: true }
    );

    console.log(crushTx);
  } catch (err) {
    console.log(err);
  }
};

const awan = async (DataId, user, data) => {
  await CreateAwan(DataId, user, data);
  await LookTransaction(DataId);
  await CrushTrancsaction(DataId);
};

CreateAwan(5, account, "Create push transaction JSON RPC");
PushTransaction(1050, account, "by awan");
