import { Api, JsonRpc, JsSignatureProvider } from 'ineryjs'
import * as dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

const url = process.env.NODE_URL

const json_rpc = new JsonRpc(url)
const private_key = process.env.PRIVATE_KEY;

const account = process.env.INERY_ACCOUNT
const actor = process.env.INERY_ACCOUNT
const token = process.env.TOKEN
const signature = new JsSignatureProvider([private_key]);

const api = new Api({
  rpc: json_rpc,
  signatureProvider: signature
})


var lastBlockNum = 0;
var lastFiveProducers = [];

// Get Last Block Info For Latest Block Number
await GetLastBlockInfo();

// If The Last Block Info Was Retrieved Succesfully
if (lastBlockNum != 0) {
  // Get Last 5 Producers Account
  await FillLastProducers();

  // If The Last Producers Were Successfully Imported
  if(lastFiveProducers.length > 0)
  {
    // Send Sample Token To Last Producers
    lastFiveProducers.forEach(async item => {
      await SendToken(item);
    });
  }

}
async function GetLastBlockInfo() {
  try {

    let get_info = {
      method: 'post',
      url: url + '/v1/chain/get_info',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    };

    await axios(get_info)
      .then((response) => {
        lastBlockNum = response.data["head_block_num"];
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error)
  }
}

async function FillLastProducers() {
  for (let index = (lastBlockNum - 4); index <= lastBlockNum; index++) {
    await GetBlockInfo(index);
  }
}

async function GetBlockInfo(block_num) {

  try {

    let data = JSON.stringify({
      "block_num_or_id": block_num.toString()
    });

    let get_block = {
      method: 'post',
      url: url + '/v1/chain/get_block',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      data: data
    };

    await axios(get_block)
      .then((response) => {
        lastFiveProducers.push(response.data["master"]);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  catch (error) {
    console.log(error)
  }
}

async function SendToken(to) {
  try {
    const result = await api.transact({
      actions: [{
        account: 'inery.token',
        name: 'transfer',
        authorization: [{
          actor: actor,
          permission: 'active',
        }],
        data: {
          from: account,
          to: to,
          quantity: '0.0001 ' + token,
          memo: 'Here 0.0001 ' + token + ' for you :)',
        }
      }]
    });

    console.log(result);
  } catch (error) {
    console.log(error)
  }
}