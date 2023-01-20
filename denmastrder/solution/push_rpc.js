import { Api, JsonRpc, JsSignatureProvider } from 'ineryjs'
import * as dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

const nodeUrl = process.env.NODE_URL

const jsonRpc = new JsonRpc(nodeUrl)
const privateKey = process.env.PRIVATE_KEY;

const accountName = process.env.INERY_ACCOUNT
const actorName = process.env.INERY_ACCOUNT
const tokenName = process.env.TOKEN
const signatureProvider = new JsSignatureProvider([privateKey]);

const api = new Api({
  rpc: jsonRpc,
  signatureProvider: signatureProvider
})


var currentBlockNum = 0;
var recentFiveProducers = [];

// Get Information About Last Block For Latest Block Number
await fetchCurrentBlockInfo();

// If the Information About the Last Block Was Retrieved Successfully
if (currentBlockNum != 0) {
  // Get the Last 5 Producer Accounts
  await fillRecentProducers();

  // If the Last Producer Imported Successfully
  if(recentFiveProducers.length > 0)
  {
    // Then Send Sample Token To First To Last Producer
    recentFiveProducers.forEach(async item => {
      await transferToken(item);
    });
  }

}
async function getLastBlockInfo() {
  try {

    let getInfoRequest = {
      method: 'post',
      url: nodeUrl + '/v1/chain/get_info',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    };

    await axios(getInfoRequest)
      .then((response) => {
        lastBlockNumber = response.data["head_block_num"];
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error)
  }
}

async function fillLastProducers() {
  for (let index = (lastBlockNumber - 4); index <= lastBlockNumber; index++) {
    await getBlockInfo(index);
  }
}

async function fetchBlockInfo(blockNumber) {
  try {
    let data = JSON.stringify({
      "block_num_or_id": blockNumber.toString()
    });

    let fetch_block = {
      method: 'post',
      url: url + '/v1/chain/get_block',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      data: data
    };

    await axios(fetch_block)
      .then((response) => {
        recentFiveProducers.push(response.data["master"]);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  catch (error) {
    console.log(error)
  }
}


async function transferCoins(receiver) {
  try {
    const outcome = await api.transact({
      actions: [{
        account: 'inery.token',
        name: 'transfer',
        authorization: [{
          actor: sender,
          permission: 'active',
        }],
        data: {
          from: senderAccount,
          to: receiver,
          quantity: '0.0001 ' + coin,
          memo: 'Sending 0.0001 ' + coin + ' to you :)',
        }
      }]
    });

    console.log(outcome);
  } catch (error) {
    console.log(error)
  }
}
