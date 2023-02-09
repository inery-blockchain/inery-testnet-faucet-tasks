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

async function getLatestBlockInfo() {
  try {
    const response = await axios({
      method: 'post',
      url: `${url}/v1/chain/get_info`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    latestBlockNum = response.data.head_block_num;
  } catch (error) {
    console.log(error);
  }
}

async function getBlockInfo(blockNum) {
  try {
    const response = await axios({
      method: 'post',
      url: `${url}/v1/chain/get_block`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      data: {
        block_num_or_id: blockNum.toString(),
      },
    });

    lastProducers.push(response.data.master);
  } catch (error) {
    console.log(error);
  }
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