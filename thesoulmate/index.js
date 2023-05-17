const axios = require('axios');
const dotenv = require('dotenv');
const { Api, JsonRpc, JsSignatureProvider } = require('ineryjs');

dotenv.config();

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

async function fetchLatestBlockNumber(nodeUrl) {
  try {
    const { head_block_num } = await getBlockData(nodeUrl, 'get_info');
    return head_block_num;
  } catch (error) {
    console.log(error);
  }
}

async function fetchBlockProducers(nodeUrl, blockNumber) {
  try {
    const { producer } = await getBlockData(nodeUrl, 'get_block', {
      block_num_or_id: blockNumber.toString(),
    });
    return producer;
  } catch (error) {
    console.log(error);
  }
}

async function sendToken(api, actor, ineryAccount, ineryToken, to) {
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
  try {
    const nodeUrl = process.env.NODE_URL;
    const privateKey = process.env.PRIVATE_KEY;
    const ineryAccount = process.env.INERY_ACCOUNT;
    const ineryToken = process.env.TOKEN;
    const actor = ineryAccount;
    const signatureProvider = new JsSignatureProvider([privateKey]);
    const rpc = new JsonRpc(nodeUrl);
    const api = new Api({ rpc, signatureProvider });

    const latestBlockNumber = await fetchLatestBlockNumber(nodeUrl);

    if (latestBlockNumber !== 0) {
      const lastProducers = [];

      for (let i = latestBlockNumber - 4; i <= latestBlockNumber; i++) {
        const producer = await fetchBlockProducers(nodeUrl, i);
        lastProducers.push(producer);
      }

      for (const producer of lastProducers) {
        await sendToken(api, actor, ineryAccount, ineryToken, producer);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

main();