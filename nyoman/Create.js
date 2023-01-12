import { transactApi, account, actor } from "./config.js";

const CreatePushTransaction = async (id, user, data) => {
  const Actiondata = { id, user, data };
  try {
    const hashtx = await transactApi.transact(
      {
        actions: [
          {
            account,
            name: "create",
            authorization: [
              {
                actor,
                permission: "active",
              },
            ],
            data: {
              ...Actiondata,
            },
          },
        ],
      },
      { broadcast: true, sign: true }
    );

    console.log(hashtx);
  } catch (err) {
    console.log(err);
  }
};

const ReadHexTransaction = async (id) => {
  try {
    const hashActionId = await transactApi.transact(
      {
        actions: [
          {
            account,
            name: "read",
            authorization: [
              {
                actor,
                permission: "active",
              },
            ],
            data: {
              id,
            },
          },
        ],
      },
      { broadcast: true, sign: true }
    );
    console.log(hashActionId);
  } catch (error) {
    console.log(error);
  }
};

const Push = async (Id, user, data) => {
  await CreatePushTransaction(Id, user, data);
  await ReadHexTransaction(Id);
};

Push(10542330, account, "inery testing rpc push for task 4");
