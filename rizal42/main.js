const { Api, JsonRpc, JsSignatureProvider } = require('ineryjs');
const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const { account, port, nodeurl, privatekey } = process.env;

const api = new Api({
  rpc: new JsonRpc(nodeurl),
  signatureProvider: new JsSignatureProvider([privatekey])
});

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Allow Cross-Origin Resource Sharing (CORS)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.post('/', async (req, res) => {
  const action = req.body.action;
  const dataId = parseInt(req.body.dataId);
  const data = req.body.data;
  if (['create', 'read', 'update', 'destroy'].includes(action) && !isNaN(dataId)) {
    try {
      const result = await api.transact({
        actions: [
          {
            account: account,
            name: action,
            authorization: [{ actor: account, permission: 'active' }],
            data: { id: dataId, user: account, data },
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

const server = app.listen(3000, () => {
  console.log(`Server running on port ${server.address().port}`);
});
