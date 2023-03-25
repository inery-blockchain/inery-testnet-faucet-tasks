import axios from 'axios';
import { Api, JsonRpc, JsSignatureProvider } from 'ineryjs';
import * as dotenv from 'dotenv';

dotenv.config();

const url = process.env.NODE_URL;
const privateKey = process.env.PRIVATE_KEY;
const account = process.env.INERY_ACCOUNT;
const actor = process.env.INERY_ACCOUNT;
const token = process.env.TOKEN;
const signature = new JsSignatureProvider([privateKey]);
const rpc = new JsonRpc(url);
const api = new Api({ rpc, signatureProvider: signature });

let latestBlockNum = 0;
let lastProducers = [];

async function request(url, method, data = {}) {
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

async function getLatestBlockInfo() {
  const response = await request(url, 'get_info');
  latestBlockNum = response.head_block_num;
}

async function getBlockInfo(blockNum) {
  const response = await request(url, 'get_block', {
    block_num_or_id: blockNum.toString(),
  });
  lastProducers.push(response.master);
}

async function fillLastProducers() {
  for (let i = latestBlockNum - 4; i <= latestBlockNum; i++) {
    await getBlockInfo(i);
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
          from: account,
          to,
          quantity: `0.0001 ${token}`,
          memo: `Here 0.0001 ${token} for you :)`,
        },
      }],
    });

    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

async function main() {
  await getLatestBlockInfo();

  if (latestBlockNum !== 0) {
    await fillLastProducers();

    if (lastProducers.length > 0) {
      for (const producer of lastProducers) {
        await sendToken(producer);
      }
    }
  }
}

main();
