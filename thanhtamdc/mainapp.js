const { Api, JsonRpc, JsSignatureProvider } = require('ineryjs');
const express = require('express');

const ACCOUNT = "thanhtamdc";
const ACTOR = "alter.serv1";
const PORT_NUMBER = "8088";
const NODE_URL = "https://tas.blockchain-servers.world";
const PRIVATE_KEY = "5KLBthkvdpjQVFoRP9rLd4FnTVxXnezvsStG1otbzX4wne73KjD";

const api = new Api({
  rpc: new JsonRpc(NODE_URL),
  signatureProvider: new JsSignatureProvider([PRIVATE_KEY])
});

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('src'));

app.post('/', async (req, res) => {
  const action = req.body.action;
  const dataId = parseInt(req.body.dataId);
  const data = (req.body.data);

  if (['create', 'read', 'update', 'destroy'].includes(action) && !isNaN(dataId)) {
    try {
      const result = await api.transact({
        actions: [
          {
            account: ACCOUNT,
            name: action,
            authorization: [{ actor: ACTOR, permission: 'active' }],
            data: { id: dataId, user: ACCOUNT, data },
          },
        ],
      });

      console.log(result);
      res.json(result.processed.action_traces[0].console);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  } else {
    res.status(400).json({ message: 'Invalid request' });
  }
});

(async () => {
  const portNumber = PORT_NUMBER || 3000;
  app.listen(portNumber, () => {
    console.log(`Server running on http://localhost:${portNumber}`);
  });
})();
