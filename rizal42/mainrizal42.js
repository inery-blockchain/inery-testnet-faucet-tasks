const { Api, JsonRpc, JsSignatureProvider } = require('ineryjs');
const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const ACCOUNT_NAME = "";
const PORT_NUMBER = "";
const NODE_URL = "http://:8888";
const PRIVATE_KEY = "";

const api = new Api({
  rpc: new JsonRpc(NODE_URL),
  signatureProvider: new JsSignatureProvider([PRIVATE_KEY])
});

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('dapp42'));

app.post('/', async (req, res) => {
  const action = req.body.action;
  const dataId = parseInt(req.body.dataId);
  const data = req.body.data;

  if (['create', 'read', 'update', 'destroy'].includes(action) && !isNaN(dataId)) {
    try {
      const result = await api.transact({
        actions: [
          {
            account: ACCOUNT_NAME,
            name: action,
            authorization: [{ actor: ACCOUNT_NAME, permission: 'active' }],
            data: { id: dataId, user: ACCOUNT_NAME, data },
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

(async () => {
  const ipAddress = await axios.get('https://api.ipify.org');
  const portNumber = PORT_NUMBER || 3000;

  app.listen(portNumber, () => {
    console.log(`Server running on http://${ipAddress.data}:${portNumber}`);
  });
})();
