const { Api, JsonRpc, JsSignatureProvider } = require('ineryjs');
const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const ACCOUNTS = "";
const PORT = process.env.PORT || 3000;
const NODE = process.env.NODE_URL || "https://node.inery.io";
const PRIVATE_KEY = "";

const api = new Api({
  rpc: new JsonRpc(NODE),
  signatureProvider: new JsSignatureProvider([PRIVATE_KEY])
});

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.post('/', async (req, res) => {
  const action = req.body.action;
  const dataId = parseInt(req.body.dataId);
  const data = req.body.data;
  if (['create', 'read', 'update', 'destroy'].includes(action) && !isNaN(dataId)) {
    try {
      const result = await api.transact({
        actions: [
          {
            account: ACCOUNTS,
            name: action,
            authorization: [{ actor: ACCOUNTS, permission: 'active' }],
            data: { id: dataId, user: ACCOUNTS, data },
          },
        ],
      });
      console.log(result);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  } else {
    res.status(400).json({ message: 'Invalid request' });
  }
});

app.listen(PORT, async () => {
  const ip = (await axios.get('https://api.ipify.org')).data;
  console.log(`Server running on http://${ip}:${PORT}`);
});
