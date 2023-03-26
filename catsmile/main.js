const express = require('express');
const { Api, JsonRpc, JsSignatureProvider } = require('ineryjs');
const dotenv = require('dotenv');
dotenv.config();

const push = express();
const env = process.env;
const rpc = new JsonRpc(env.Node_vps);
const signatureProvider = new JsSignatureProvider([env.Private_key]);
const api = new Api({ rpc, signatureProvider });
const account = env.Inery_acc;
const authorization = [{ actor: account, permission: 'active' }];

push.use(express.static('public'));
push.use(express.urlencoded({ extended: true }));
push.use(express.json());

push.get('/', (req, res) => {
  res.send(`
    <div style="border: 1px solid black; padding: 10px;">
      <h1><center>Create Transaction on Blockchain Inery</center></h1>
      <form method="post" action="/">
        <label for="data-id-input"><center>Input ID</center></label>
        <center><input id="data-id-input" type="number" name="dataId" required></center>
        <br>
        <label for="data-input"><center>String</center></label>
        <center><input id="data-input" type="text" name="data" required></center>
        <br>
        <center><button type="submit">Create</button></center>
      </form>
      <div id="output"></div>
    </div>
  `);
});

push.post('/', async (req, res) => {
  const dataId = parseInt(req.body.dataId);
  const data = req.body.data;
  if (!isNaN(dataId)) {
    try {
      const result = await api.transact({
        actions: [
          {
            account,
            name: 'create',
            authorization,
            data: { id: dataId, user: account, data },
          },
        ],
      });
      console.log(`Action detail:\n`, result.processed.action_traces[0].act);
      const output = `Action detail:\n ${JSON.stringify(result.processed.action_traces[0].act, null, 2)}`;
      res.send(`
        <div style="border: 1px solid black; padding: 10px;">
          <h1><center>Create Transaction on Blockchain Inery</center></h1>
          <form method="post" action="/">
            <label for="data-id-input"><center>Input ID</center></label>
            <center><input id="data-id-input" type="number" name="dataId" required></center>
            <br>
            <label for="data-input"><center>String</center></label>
            <center><input id="data-input" type="text" name="data" required></center>
            <br>
            <center><button type="submit">Create</button></center>
          </form>
			<h3><center>Action Output</center></h3>
			<div style="border: 1px solid black; padding: 10px; background-color: #d3d3d3; color: #000080;">
			<div id="output"><center>${output}</center></div>
			</div>
		</div>
      `);
    } catch (error) {
      console.error(`Error executing transaction: ${error}`);
      res.status(600).json({ message: `Error occurred while executing transaction : ${error}` });
    }
  } else {
    res.status(500).json({ message: 'Not Valid' });
  }
});

const port = process.env.Access_Port || 5000;
push.listen(port, () => {
  console.log(`Run On Access Port ${port}`);
});




