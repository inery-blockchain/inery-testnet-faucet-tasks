import Link from "next/link";
import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/context";

interface IPropsCreate {
  id: number;
  user: string;
  data: string;
}

interface IProps {
  handlerModal: () => void;
  loading: boolean;
  createHandler: (props: IPropsCreate) => void;
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
  read?: boolean;
}

const Modal = ({
  handlerModal,
  loading,
  createHandler,
  data,
  setData,
  read,
}: IProps) => {
  const style = {
    container:
      "flex flex-col  py-4 gap-4 pt-[24px] z-1 bg-gray-700 absolute top-50% left-50% w-[500px] h-max p-[24px] rounded-md ",
    wrapper: "font-bold text-white",
    form: "flex flex-col items-start justify-around max-w-5xl mt-6 sm:w-full gap-4 text-white",
    input:
      "border-2 w-[350px]  bg-inherit h-10 px-5 pr-16 rounded-lg text-sm color-[#fff] focus:border-current",
    btn: "bg-purple-600 hover:bg-purple-800 items-end text-white font-bold py-2 px-4 rounded-lg w-[100px] mt-[24px]",
  };
  return (
    <div className={style.container}>
      <h1 className="font-bold text-gray-300 text-xl">
        Create New Data on inery
      </h1>
      <form className={style.form}>
        <input
          placeholder="type any number"
          type="text"
          className={style.input}
          value={data.id}
          onChange={(e) => setData({ ...data, id: e.target.value })}
        />
        {read && (
          <input
            type="text"
            placeholder="type data"
            className={style.input}
            value={data.data}
            onChange={(e) => setData({ ...data, data: e.target.value })}
          />
        )}
      </form>
      <button
        className={style.btn}
        onClick={() => createHandler({ ...data, user: "nyeka" })}
      >
        {loading ? "Loading..." : "Submit"}
      </button>
      <span
        className="absolute bg-purple-700 rounded-full w-[35px] h-[35px] text-xl top-[10px] right-[10px] text-center cursor-pointer"
        onClick={handlerModal}
      >
        &#x2718;
      </span>
    </div>
  );
};

const Dahboard = () => {
  const [modal, setModal] = React.useState(false);
  const [readModal, setReadModal] = React.useState(false);
  const { loading, createHandler, Read, setCurrent } =
    useContext(GlobalContext);
  const [data, setData] = React.useState({
    id: "",
    data: "",
  });

  const handlerModal = () => {
    setModal(!modal);
    setCurrent("create");
  };

  const handlerUpdate = () => {
    setModal(!modal);
    setCurrent("update");
  };

  const handlerReadModal = () => {
    setReadModal(!readModal);
    setCurrent("read");
  };

  const handlerDelete = () => {
    setReadModal(!readModal);
    setCurrent("destroy");
  };

  const style = {
    container: "flex flex-col items-center justify-center py-4 gap-4 pt-[24px]",
    wrapper: "font-bold text-white",
  };

  useEffect(() => {
    if (loading) return;
    setModal(false);
    setReadModal(false);
  }, [loading]);

  return (
    <div className={style.container}>
      <img
        src="https://www.pcgamesn.com/wp-content/uploads/2021/07/genshin-impact-baal-boss-fight-900x506.jpg"
        className="avatar w-[125px] h-[125px] rounded-full aspect-auto object-cover"
      />
      <div className="flex flex-col gap-[24px] items-center">
        <div>
          <h2 className="text-white font-bold text-2xl text-center mb-[20px]">
            Inery Crud
          </h2>
          <p className="text-center text-[gray] font-medium">
            Select this button to run the blockchain inery app
          </p>
          <p className="text-[gray] font-medium">
            after execute the button, you will see log transaction in the bottom
          </p>
        </div>
        <div className="flex gap-[24px] mt-[24px]">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-[220px]"
            onClick={handlerModal}
          >
            Create
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-[220px]"
            onClick={handlerReadModal}
          >
            Read
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-[220px]"
            onClick={handlerUpdate}
          >
            Update
          </button>
          <button
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded w-[220px]"
            onClick={handlerDelete}
          >
            Delete
          </button>
        </div>
      </div>
      {modal && (
        <Modal
          handlerModal={handlerModal}
          loading={loading}
          createHandler={createHandler}
          data={data}
          setData={setData}
          read={true}
        />
      )}
      {readModal && (
        <Modal
          handlerModal={handlerReadModal}
          createHandler={Read}
          loading={loading}
          data={data}
          setData={setData}
          read={false}
        />
      )}
    </div>
  );
};

export default Dahboard;
