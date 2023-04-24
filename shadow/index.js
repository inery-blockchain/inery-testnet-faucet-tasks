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

async function callIneryApi(endpoint, requestData) {
  try {
    const response = await axios({
      method: 'post',
      url: `${url}/v1/chain/${endpoint}`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      data: requestData,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function getLatestBlockNum() {
  const response = await callIneryApi('get_info', {});

  return response.head_block_num;
}

async function getLastProducers() {
  const latestBlockNum = await getLatestBlockNum();

  const lastProducers = [];

  for (let i = latestBlockNum - 4; i <= latestBlockNum; i++) {
    const response = await callIneryApi('get_block', { block_num_or_id: i.toString() });

    lastProducers.push(response.master);
  }

  return lastProducers;
}

async function sendIneryToken(to) {
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
  const lastProducers = await getLastProducers();

  for (const producer of lastProducers) {
    await sendIneryToken(producer);
  }
}

main();
