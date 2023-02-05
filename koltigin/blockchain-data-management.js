const { Api, JsonRpc, RpcError, JsSignatureProvider } = require("ineryjs");

const createRecord = async (recordId, userAccount, data) => {
  try {
    const transactionHash = await Userapi.transact({
      actions: [
        {
          account: userAccount,
          name: "create",
          authorization: [
            {
              actor: userAccount,
              permission: "active",
            },
          ],
          data: {
            id: recordId,
            user: userAccount,
            data,
          },
        },
      ],
    }, { broadcast: true, sign: true });

    console.log(`Transaction hash: ${transactionHash}`);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

const retrieveRecord = async (recordId) => {
  try {
    const transactionHash = await Userapi.transact({
      actions: [
        {
          account: userAccount,
          name: "read",
          authorization: [
            {
              actor: userAccount,
              permission: "active",
            },
          ],
          data: {
            id: recordId,
          },
        },
      ],
    }, { broadcast: true, sign: true });

    console.log(`Transaction hash: ${transactionHash}`);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

const pushRecord = async (recordId, userAccount, data) => {
  await createRecord(recordId, userAccount, data);
  await retrieveRecord(recordId);
};

pushRecord(10543230, userAccount, "Inery task4");