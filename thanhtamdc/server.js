const { Api, JsonRpc, JsSignatureProvider } = require('ineryjs');
const express = require('express');

const ACCOUNT = "thanhtamdc";
const ACTOR = "alter.serv1";
const PORT_NUMBER = "8088";
const RPC = "https://tas.blockchain-servers.world";
const P_KEY = "5KLBthkvdpjQVFoRP9rLd4FnTVxXnezvsStG1otbzX4wne73KjD";

const api = new Api({
  rpc: new JsonRpc(RPC),
  signatureProvider: new JsSignatureProvider([P_KEY])
});

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.post('/', async (req, res) => {
  const dataId = parseInt(req.body.dataId);
    try {
      const result = await api.transact({
        actions: [
          {
            account: ACCOUNT,
            name: "read",
            authorization: [{ actor: ACTOR, permission: 'active' }],
            data: { id: dataId },
          },
        ],
      });
      console.log(result);
      res.json(result.processed.action_traces[0].console);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
});

(async () => {
  const portNumber = PORT_NUMBER || 3000;
  app.listen(portNumber, () => {
    console.log(`Server running on http://localhost:${portNumber}`);
  });
})();
