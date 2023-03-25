const { Api, JsonRpc, JsSignatureProvider } = require('ineryjs');
require('dotenv').config();

const url = 'http://185.187.170.157:8888';
const jsonRpc = new JsonRpc(url);

const privateKey = process.env.PRIV_KEYS;
const actor = process.env.INERY_NAME;
const account = 'ilker45';
const signature = new JsSignatureProvider([privateKey]);
const api = new Api({ rpc: jsonRpc, signatureProvider: signature });

async function create(id, user, data) {
  try {
    const tx = await api.transact({
      actions: [
        {
          account,
          name: 'create',
          authorization: [{ actor, permission: 'active' }],
          data: { id, user, data },
        },
      ],
    }, { broadcast: true, sign: true });

    console.log('=======================================================================');
    console.log('=================== CREATE transaction information ====================');
    console.log('=======================================================================');
    console.log(tx, '\n');
    console.log('Response from contract:', tx.processed.action_traces[0].console);
    console.log('\n');
  } catch (error) {
    console.log(error);
  }
}

async function destroy(id) {
  try {
    const tx = await api.transact({
      actions: [
        {
          account,
          name: 'destroy',
          authorization: [{ actor, permission: 'active' }],
          data: { id },
        },
      ],
    }, { broadcast: true, sign: true });

    console.log('=======================================================================');
    console.log('================== DESTROY transaction information ====================');
    console.log('=======================================================================');
    console.log(tx, '\n');
    console.log('Response from contract:', tx.processed.action_traces[0].console);
    console.log('\n');
  } catch (error) {
    console.log(error);
  }
}

async function main(id, user, data) {
  await create(id, user, data);
  await destroy(id);
}

main(1, account, 'INERY TESTNET TASK4');
