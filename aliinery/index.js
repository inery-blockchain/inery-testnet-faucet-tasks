import readline from 'readline';
import { Api, JsonRpc, JsSignatureProvider } from 'ineryjs/dist/index.js';
import * as dotenv from 'dotenv';
dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const url = 'http://5.78.66.104:8888';
const jsonRpc = new JsonRpc(url);
const privateKey = process.env.PRIVATE_KEY;
const actor = process.env.INERY_ACCOUNT;
const signature = new JsSignatureProvider([privateKey]);
const api = new Api({ rpc: jsonRpc, signatureProvider: signature });

const mathCaptcha = async () => {
  const num1 = Math.floor(Math.random() * 10);
  const num2 = Math.floor(Math.random() * 10);
  const operator = Math.random() > 0.5 ? '+' : '-';
  const correctAnswer = operator === '+' ? num1 + num2 : num1 - num2;

  const userAnswer = await new Promise(resolve => {
    rl.question(`Are you a robot? If not please solve this math captcha: ${num1} ${operator} ${num2} = `, resolve);
  });

  if (parseInt(userAnswer) === correctAnswer) {
    console.log('Math captcha passed!');
    return true;
  } else {
    console.log('Math captcha failed. Please try again.');
    return false;
  }
};

const executeTransaction = async (contract, action, data, actor, permission) => {
  try {
    const tx = await api.transact(
      {
        actions: [
          {
            account: contract,
            name: action,
            authorization: [{ actor, permission }],
            data,
          },
        ],
      },
      { broadcast: true, sign: true }
    );

    console.log('Transaction details:');
    console.log(tx, '\n');
    console.log('Response from contract:', tx.processed.action_traces[0].console);
    console.log('\n');
  } catch (error) {
    console.log(error);
  }
};

const createAndDestroyRecord = async (id, user, data, action) => {
  await executeTransaction('aliinery', action, { id, user, data }, actor, 'active');
};

const main = async (id, user, data) => {
  if (await mathCaptcha()) {
    await createAndDestroyRecord(id, user, data, 'create');
    await createAndDestroyRecord(id, user, data, 'destroy');
  } else {
    console.log('Transaction cancelled. Robot detected.');
  }
  rl.close();
};

main(1, process.env.INERY_ACCOUNT);
