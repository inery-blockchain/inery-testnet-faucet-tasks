import { Userapi, account, actor } from "./config.js";

const baru = async (id, user, data) => {
  try {
    const hashtx = await Userapi.transact(
      {
        actions: [
          {
            account,
            name: "baru",
            authorization: [
              {
                actor,
                permission: "active",
              },
            ],
            data: {
              id,
              user,
              data,
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

const baca = async (id) => {
  try {
    const hashId = await Userapi.transact(
      {
        actions: [
          {
            account,
            name: "baca",
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
    console.log(hashId);
  } catch (error) {
    console.log(error);
  }
};

const Push = async (HasId, user, data) => {
  await Create(HasId, user, data);
  await Read(HasId);
};

Push(10543230, account, "inery task4");
