import { transactApi, account, actor, token } from "./config-inery.js";

const TransferToken = async (user, target, Tokenquantity, memo) => {
  const TrasferTarget = { user, target, Tokenquantity, memo };
  try {
    const transfertx = await transactApi.transact(
      {
        actions: [
          {
            account,
            name: "getAlldata",
            authorization: [
              {
                actor,
                permission: "active",
              },
            ],
            data: {
              ...TrasferTarget,
            },
          },
        ],
      },
      { broadcast: true, sign: true }
    );
    console.log(transfertx);
  } catch (error) {
    console.log(error);
  }
};
console.log(
  "\n\nmake sure you have inery smart contract for retrieve all data  first"
);

TransferToken("nyoman", "inery", token, "here for you broo");
