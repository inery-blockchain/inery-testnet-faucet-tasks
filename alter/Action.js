import { PushApi, account, actor } from "./inery-config.js";

const CreateAction = async (id, user, data) => {
  const DataAction = { id, user, data };
  try {
    const hashtx = await PushApi.transact(
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
              ...DataAction,
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

const ReadAction = async (id) => {
  try {
    const ActionId = await PushApi.transact(
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
    console.log(ActionId);
  } catch (error) {
    console.log(error);
  }
};

const Action = async (ActionId, user, data) => {
  await CreateAction(ActionId, user, data);
  await ReadAction(ActionId);
};

Action(94323, account, "Task4 Testing inery");
