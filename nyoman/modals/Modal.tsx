import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/context";

interface IProps {
  handle: () => void;
  handlerData: any;
}

const Modal = ({ handle, handlerData }: IProps) => {
  const [data, setData] = React.useState<any>({
    id: "",
    user: "nyoman",
    data: "",
  });
  const { loading, status } = useContext(GlobalContext);

  const handleFunc = () => {
    if (status === "create" || status === "update") {
      return true;
    }
    return false;
  };

  const style = {
    container:
      "flex flex-col  py-4 gap-4 pt-[24px] z-1 bg-slate-800 absolute top-50% left-50% w-[500px] h-max p-[24px] rounded-md ",
    wrapper: "font-bold text-white",
    form: "flex flex-col items-start justify-around max-w-5xl mt-6 sm:w-full gap-4 text-white",
    textarea:
      "border-2 w-full bg-inherit h-[200px] px-5 pr-16 pt-[20px] rounded-lg text-sm color-[#fff] focus:border-current disabled:bg-gray-500 disabled:cursor-not-allowed",
    input:
      "border-2 w-full bg-inherit h-10 px-5 pr-16 p-[24px] rounded-lg text-sm color-[#fff] focus:border-current disabled:bg-gray-500 disabled:cursor-not-allowed",
    btn: "bg-red-600 hover:bg-red-800 items-end text-white text-lg font-bold py-2 px-4 rounded-lg w-[100px] mt-[24px] disabled:bg-gray-500 disabled:cursor-not-allowed",
  };
  return (
    <div className={style.container}>
      <h1 className="font-bold text-gray-300 text-xl">
        {status} Data on inery blockchain
      </h1>
      <form className={style.form}>
        <input
          placeholder="type any number"
          type="text"
          className={style.input}
          value={data.id}
          onChange={(e) => setData({ ...data, id: e.target.value })}
        />
        {handleFunc() && (
          <input
            type="text"
            placeholder="type data"
            className={style.input}
            value={data.user}
            disabled={true}
          />
        )}
        {handleFunc() ? (
          <textarea
            placeholder="type data"
            className={style.textarea}
            value={data.data}
            onChange={(e) => setData({ ...data, data: e.target.value })}
          />
        ) : null}
      </form>
      <button
        className={style.btn}
        onClick={() => handlerData({ ...data })}
        disabled={!data.id || loading}
      >
        {loading ? "Loading..." : `${status}`}
      </button>
      <span
        className="absolute bg-red-700 rounded-full w-[35px] h-[35px] text-xl top-[10px] right-[10px] text-center cursor-pointer"
        onClick={handle}
      >
        &#x2718;
      </span>
    </div>
  );
};

export default Modal;
