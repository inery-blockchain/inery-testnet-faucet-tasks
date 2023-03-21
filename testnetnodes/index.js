const { Api, JsonRpc, JsSignatureProvider } = require('ineryjs');

const nodeUrl = 'http://45.8.133.71:8888';

const privateKey = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
const accountName = 'testnetnodes';

const targetAccountName = 'exampleaccount';

const rpc = new JsonRpc(nodeUrl);

const signatureProvider = new JsSignatureProvider([privateKey]);

const api = new Api({ rpc, signatureProvider });

const actions = {
  create: async (id, user, data) => {
    try {
      await api.transact({
        actions: [
          {
            account: targetAccountName,
            name: 'create',
            authorization: [{ actor: accountName, permission: 'active' }],
            data: { id, user, data },
          },
        ],
      });
    } catch (error) {
      console.error(error);
    }
  },
  read: async (id) => {
    try {
      const result = await rpc.get_table_rows({
        json: true,
        code: targetAccountName,
        scope: targetAccountName,
        table: 'data',
        lower_bound: id,
        upper_bound: id,
        limit: 1,
      });

      console.log(result.rows[0]);
    } catch (error) {
      console.error(error);
    }
  },
  update: async (id, data) => {
    try {
      await api.transact({
        actions: [
          {
            account: targetAccountName,
            name: 'update',
            authorization: [{ actor: accountName, permission: 'active' }],
            data: { id, data },
          },
        ],
      });
    } catch (error) {
      console.error(error);
    }
  },
  destroy: async (id) => {
    try {
      await api.transact({
        actions: [
          {
            account: targetAccountName,
            name: 'destroy',
            authorization: [{ actor: accountName, permission: 'active' }],
            data: { id },
          },
        ],
      });
    } catch (error) {
      console.error(error);
    }
  },
};

async function main() {
  const id = 1;
  const user = 'exampleuser';
  const data = 'exampledata';

  await actions.create(id, user, data);
  await actions.read(id);
  await actions.update(id, 'updatedata');
  await actions.read(id);
  await actions.destroy(id);
}

main();
