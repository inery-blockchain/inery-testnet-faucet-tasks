import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/context";

const Navbar = () => {
  const { api, actor, setOutput } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    id: "",
    data: "",
  });

  interface IPropsCreate {
    id: number;
    user: string;
    data: string;
  }

  const createHandler = async ({ id, user, data }: IPropsCreate) => {
    const Hashdata = { id, user, data };
    try {
      setLoading(true);
      const tx = await api.transact(
        {
          actions: [
            {
              account: actor,
              name: "create",
              authorization: [
                {
                  actor,
                  permission: "active",
                },
              ],
              data: {
                ...Hashdata,
              },
            },
          ],
        },
        { broadcast: true, sign: true }
      );
      setOutput(tx as any);
      console.log(tx);
    } catch (error) {
      setOutput("Error!, please check your input");
      console.log(error);
    }
    setLoading(false);
  };

  const style = {
    container:
      "flex min-h-full flex-col items-center justify-center py-2 gap-4",
    form: "flex flex-col items-center justify-around max-w-4xl mt-6 sm:w-full gap-4",
    input:
      "border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none",
    btn: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
  };

  return (
    <div className={style.container}>
      <form className={style.form}>
        <input
          type="text"
          placeholder="insert any number"
          className={style.input}
          pattern="^[0-9]*[.,]?[0-9]*$"
          value={data.id}
          onChange={(e) => setData({ ...data, id: e.target.value })}
        />

        <input
          placeholder="type any text"
          className={style.input}
          type="text"
          value={data.data}
          onChange={(e) => setData({ ...data, data: e.target.value })}
        />
      </form>
      <button
        className={style.btn}
        onClick={() =>
          createHandler({
            id: parseInt(data.id),
            user: actor,
            data: data.data,
          })
        }
      >
        {loading ? "Loading..." : "Create"}
      </button>
    </div>
  );
};

export default Navbar;
