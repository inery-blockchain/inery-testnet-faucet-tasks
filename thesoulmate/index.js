const axios = require('axios');
const dotenv = require('dotenv');
const { Api, JsonRpc, JsSignatureProvider } = require('ineryjs');

dotenv.config();

const nodeUrl = process.env.NODE_URL;
const privateKey = process.env.PRIVATE_KEY;
const ineryAccount = process.env.INERY_ACCOUNT;
const ineryToken = process.env.TOKEN;
const actor = ineryAccount;
const signatureProvider = new JsSignatureProvider([privateKey]);
const rpc = new JsonRpc(nodeUrl);
const api = new Api({ rpc, signatureProvider });

let latestBlockNumber = 0;
let lastProducers = [];

async function getBlockData(url, method, data = {}) {
  try {
    const response = await axios({
      method,
      url: `${url}/v1/chain/${method}`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      data,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function fetchLatestBlockNumber() {
  const { head_block_num } = await getBlockData(nodeUrl, 'get_info');
  latestBlockNumber = head_block_num;
}

async function fetchBlockProducers(blockNumber) {
  const { producer } = await getBlockData(nodeUrl, 'get_block', {
    block_num_or_id: blockNumber.toString(),
  });
  lastProducers.push(producer);
}

async function fetchLastProducers() {
  for (let i = latestBlockNumber - 4; i <= latestBlockNumber; i++) {
    await fetchBlockProducers(i);
  }
}

async function sendToken(to) {
  try {
    const result = await api.transact({
      actions: [{
        account: 'inery.token',
        name: 'transfer',
        authorization: [{
          actor,
          permission: 'active',
        }],
        data: {
          from: ineryAccount,
          to,
          quantity: `0.0001 ${ineryToken}`,
          memo: `Here 0.0001 ${ineryToken} for you :)`,
        },
      }],
    });

    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

async function main() {
  await fetchLatestBlockNumber();

  if (latestBlockNumber !== 0) {
    await fetchLastProducers();

    if (lastProducers.length > 0) {
      for (const producer of lastProducers) {
        await sendToken(producer);
      }
    }
  }
}

main();
