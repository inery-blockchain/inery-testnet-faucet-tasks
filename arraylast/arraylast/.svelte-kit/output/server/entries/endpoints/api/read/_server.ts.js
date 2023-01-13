import { j as json } from "../../../../chunks/index2.js";
import { a as api, b as account, c as actor } from "../../../../chunks/config.js";
const POST = async ({ request }) => {
  const { id } = await request.json();
  try {
    const tx = await api.transact(
      {
        actions: [
          {
            account,
            name: "read",
            authorization: [
              {
                actor,
                permission: "active"
              }
            ],
            data: {
              id
            }
          }
        ]
      },
      { broadcast: true, sign: true }
    );
    return json(tx);
  } catch (error) {
    return json(error);
  }
};
export {
  POST
};
