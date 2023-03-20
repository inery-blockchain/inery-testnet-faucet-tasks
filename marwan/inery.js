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
  <div style="border: 1px solid black; padding: 10px;">
    <form method="post" action="/result">
            <center><div class="w-1 mask mask-box">
              <img src="https://avatars.githubusercontent.com/u/97181725?v=4" />
            </div><center>
    <h1><center>Create Transaction on Blockchain Inery</center></h1>
      <center><label for="action-select">Select the menu you want to execute</label><center>
      <select id="action-select" name="action" required>
        <option value="create">Create</option>
        <option value="update">Update</option>
        <option value="destroy">Destroy</option></select>
      <label for="data-id-input">ID:</label>
      <input id="data-id-input" type="number" name="dataId" required>
      <button type="submit">Execute</button>
    </form>
    <div id="output"></div>
    </div>
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
      res.status(500).json({ message: `Please fill information in .env file: ${error}` });
    }
  } else {
    res.status(400).json({ message: 'Input Not Valid.' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
