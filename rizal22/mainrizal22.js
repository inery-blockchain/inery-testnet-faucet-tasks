const { Api, JsonRpc, JsSignatureProvider } = require('ineryjs');
const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const accounts ="";
const PORT ="";
const node ="";
const json_rpc = new JsonRpc(node);
const private_key ="";
const signature = new JsSignatureProvider([private_key]);

const api = new Api({
  rpc: json_rpc,
  signatureProvider: signature,
});

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static());

app.post('dapp22', async (req, res) => {
  const actioninery = req.body.actioninery;
  const dataIdinery = parseInt(req.body.dataIdinery);
  const data = req.body.data;
  if (['create', 'read', 'update', 'destroy'].includes(actioninery) && !isNaN(dataIdinery)) {
    try {
      const results = await api.transact({
        actions: [
          {
            account: accounts,
            name: actioninery,
            authorization: [{ actor: accounts, permission: 'active' }],
            data: { id: dataIdinery, user: accounts, data },
          },
        ],
      });
      console.log(results);
      res.json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  } else {
    res.status(400).json({ message: 'Invalid request' });
  }
});

(async () => {
  const ip_node = await axios.get('https://api.ipify.org');
  const port_node = PORT || 3000;
  app.listen(port_node, () => {
    console.log(`Server running on http://${ip_node.data}:${port_node}`);
  });
})();
