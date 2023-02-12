import readline from 'readline'
import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'ineryjs/dist/index.js'
import * as dotenv from 'dotenv'
dotenv.config()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const url = "http://172.31.12.236:8888"
const json_rpc = new JsonRpc(url) 
const private_key = process.env.PRIVATE_KEY
const actor = process.env.INERY_ACCOUNT
const signature  = new JsSignatureProvider([private_key]);
const api = new Api({ rpc: json_rpc, signatureProvider: signature })

const mathCaptcha = async () => {
  const num1 = Math.floor(Math.random() * 10);
  const num2 = Math.floor(Math.random() * 10);
  const operator = Math.random() > 0.5 ? "+" : "-";
  const correctAnswer = operator === "+" ? (num1 + num2) : (num1 - num2);

  const userAnswer = await new Promise((resolve) => {
    rl.question(`Are you a robot? If not please solve this math captcha: ${num1} ${operator} ${num2} = `, resolve);
  });
  
  if (parseInt(userAnswer) === correctAnswer) {
    console.log("Math captcha passed!");
    rl.close();
    return true;
  } else {
    console.log("Math captcha failed. Please try again.");
    rl.close();
    return false;
  }
}

async function executeTransaction(contract, action, data, actor, permission) {
  try {
    const tx = await api.transact({
      actions: [
        {
          account: contract,
          name: action,
          authorization: [{ actor, permission }],
          data
        }
      ]
    }, { broadcast: true, sign: true })

    console.log("Transaction details:")
    console.log(tx, "\n")
    console.log("Response from contract:", tx.processed.action_traces[0].console)
    console.log("\n")
  } catch (error) {
    console.log(error)
  }
}

async function create(id, user, data) {
  await executeTransaction("blackswan", "create", { id, user, data }, actor, "active")
}

async function destroy(id) {
  await executeTransaction("blackswan", "destroy", { id }, actor, "active")
}

async function main(id, user, data) {
  if (await mathCaptcha()) {
    await create(id, user, data);
    await destroy(id);
  } else {
    console.log("Transaction cancelled robot detected.");
  }
}

main(1, process.env.INERY_ACCOUNT)