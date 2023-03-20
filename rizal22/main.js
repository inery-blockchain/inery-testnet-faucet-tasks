const { Api, JsonRpc, JsSignatureProvider } = require('ineryjs');
const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const { ACCOUNT, PORT, NODE_URL, PRIV_KEY } = process.env;

const api = new Api({
  rpc: new JsonRpc(NODE_URL),
  signatureProvider: new JsSignatureProvider([PRIV_KEY])
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
            account: ACCOUNT,
            name: action,
            authorization: [{ actor: ACCOUNT, permission: 'active' }],
            data: { id: dataId, user: ACCOUNT, data },
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
  const ip = await axios.get('https://api.ipify.org');
  const port = PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on http://${ip.data}:${port}`);
  });
})();
