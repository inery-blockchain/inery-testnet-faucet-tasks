import { Api, JsonRpc, JsSignatureProvider } from 'ineryjs';
import dotenv from 'dotenv';
dotenv.config();

// membuat koneksi ke node JSON-RPC Inery menggunakan JsonRpc
const rpc = new JsonRpc(process.env.NODE_URL);

// menandatangani transaksi dengan kunci pribadi menggunakan JsSignatureProvider
const signatureProvider = new JsSignatureProvider([process.env.PRIV_KEY]);

// membuat objek Api untuk berinteraksi dengan kontrak cerdas
const api = new Api({
  rpc,
  signatureProvider,
});

// akun yang digunakan didefinisikan dalam variabel lingkungan ACCOUNT
const account = process.env.ACCOUNT;

const id = 1000;
const data = 'INERY JSON-RPC CRUD push transaction';

async function createData() {
  try {
    // membuat data baru pada kontrak cerdas
    const result = await api.transact({
      actions: [api.with(account).as(account).create(id, account, data)],
    });

    console.log(result.processed.action_traces[0].act.name);
    console.log(result.processed.action_traces[0].console);
    console.log(result.processed.action_traces[0]);
  } catch (error) {
    console.error(error);
  }
}

async function readData() {
  try {
    // membaca data dari kontrak cerdas
    const result = await api.transact({
      actions: [api.with(account).as(account).read(id)],
    });

    console.log(result.processed.action_traces[0].act.name);
    console.log(result.processed.action_traces[0].console);
    console.log(result.processed.action_traces[0]);
  } catch (error) {
    console.error(error);
  }
}

async function updateData() {
  try {
    // mengupdate data pada kontrak cerdas
    const result = await api.transact({
      actions: [api.with(account).as(account).update(id, data)],
    });

    console.log(result.processed.action_traces[0].act.name);
    console.log(result.processed.action_traces[0].console);
    console.log(result.processed.action_traces[0]);
  } catch (error) {
    console.error(error);
  }
}

async function deleteData() {
  try {
    // menghapus data pada kontrak cerdas
    const result = await api.transact({
      actions: [api.with(account).as(account).destroy(id)],
    });

    console.log(result.processed.action_traces[0].act.name);
    console.log(result.processed.action_traces[0].console);
    console.log(result.processed.action_traces[0]);
  } catch (error) {
    console.error(error);
  }
}

createData();
readData();
updateData();
deleteData();
