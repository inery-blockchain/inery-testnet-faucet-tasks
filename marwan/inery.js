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
app.post('/result', async (req, res) => {
  const action = req.body.action;
  const dataId = parseInt(req.body.dataId);
  const data = req.body.data;
  if (['create', 'update', 'destroy'].includes(action) && !isNaN(dataId)) {
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
