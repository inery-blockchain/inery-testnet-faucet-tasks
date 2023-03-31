const { Api, JsonRpc,  JsSignatureProvider } = require('ineryjs/dist/index.js');
const dotenv = require('dotenv');

dotenv.config();

const url = process.env.NODE_URL;
const pk = process.env.PRIV_KEY;
const account = process.env.IN_ACCOUNT;
const actor = process.env.IN_ACCOUNT;

const json_rpc = new JsonRpc(url);
const signature = new JsSignatureProvider([pk]);

const api = new Api({rpc: json_rpc, signatureProvider: signature});

function create(id, user, data){
    api.transact({
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
    },
    {broadcast:true,sign:true})
    .then(tx => {
      console.log("######################################################")
      console.log("################# Create Transaction #################");
      console.log("######################################################")
      console.log(tx, "\n");
      console.log("Response from contract :", tx.processed.action_traces[0].console);
      console.log("\n");
    })
    .catch(error => console.log(error));
}

function read(id){
    api.transact({
      actions:[
        {
          account,
          name:"read",
          authorization:[
            {
              actor,
              permission:"active"
            }
          ],
          data:{
            id
          }
        }
      ]
    },
    {broadcast:true,sign:true})
    .then(tx => {
      console.log("######################################################")
      console.log("################## Read Transaction ##################");
      console.log("######################################################")
      console.log(tx, "\n");
      console.log("Response from contract :", tx.processed.action_traces[0].console);
      console.log("\n");
    })
    .catch(error => console.log(error));
}

function destroy(id){
    api.transact({
      actions:[
        {
          account,
          name:"destroy",
          authorization:[
            {
              actor,
              permission:"active"
            }
          ],
          data:{
            id
          }
        }
      ]
    },
    {broadcast:true,sign:true})
    .then(tx => {
      console.log("######################################################")
      console.log("################ Destroy Transaction #################");
      console.log("######################################################")
      console.log(tx, "\n");
      console.log("Response from contract :", tx.processed.action_traces[0].console);
      console.log("\n");
    })
    .catch(error => console.log(error));
}

function main(id, user, data){
    create(id, user, data);
    read(id);
    destroy(id);
}

main(1, account, "Push Transaction Json Rpc");
