const express = require('express');
const { Api, JsonRpc, JsSignatureProvider } = require('ineryjs');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const env = process.env;
const rpc = new JsonRpc(env.NODE_URL);
const signatureProvider = new JsSignatureProvider([env.PRIV_KEY]);
const api = new Api({ rpc, signatureProvider });
const account = env.ACCOUNT;
const authorization = [{ actor: account, permission: 'active' }];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send(`
    <form method="post" action="/result">
      <label for="action-select">Aksi yang ingin dilakukan:</label>
      <select id="action-select" name="action" required>
        <option value="create">Create</option>
        <option value="read">Read</option>
        <option value="update">Update</option>
        <option value="destroy">Destroy</option>
      </select>
      <br>
      <label for="data-id-input">Data ID:</label>
      <input id="data-id-input" type="number" name="dataId" required>
      <br>
      <label for="data-input">Data:</label>
      <input id="data-input" type="text" name="data" required>
      <br>
      <button type="submit">Execute</button>
    </form>
  `);
});

app.post('/result', async (req, res) => {
  const action = req.body.action;
  const dataId = parseInt(req.body.dataId);
  const data = req.body.data;
  if (['create', 'read', 'update', 'destroy'].includes(action) && !isNaN(dataId)) {
    try {
      const result = await api.transact({
        actions: [
          {
            account,
            name: action,
            authorization,
            data: { id: dataId, user: account, data },
          },
        ],
      });
      console.log(`Action detail:\n`, result.processed.action_traces[0].act);
      res.json(result.processed.action_traces[0]);
    } catch (error) {
      console.error(`Error executing ${action.toUpperCase()} transaction: ${error}`);
      res.status(500).json({ message: `Terjadi kesalahan saat mengeksekusi transaksi: ${error}` });
    }
  } else {
    res.status(400).json({ message: 'Input tidak valid.' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

