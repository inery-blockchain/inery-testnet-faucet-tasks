import { GlobalContext } from "../context/context";
import React, { useContext, useEffect } from "react";


interface IProps {
  handle: () => void;
  handlerData: any;
}

const Modal = ({ handle, handlerData }: IProps) => {
  const [data, setData] = React.useState<any>({
    user: "amirmp",
    data: "",
    id: "",
  });
  const { loading, status } = useContext(GlobalContext);

  const handleFunc = () => {
    if (status === "create") {
      return true;
    }
    return false;
  };

  const style = {
    container:
      "flex flex-col  py-4 gap-4 pt-[24px] z-1 bg-purple-700 absolute top-50% left-50% w-[500px] h-max p-[24px] rounded-md ",
    wrapper: "font-bold text-blue",
    form: "flex flex-col items-start justify-around max-w-5xl mt-6 sm:w-full gap-4 text-blue",
    textarea:
      "border-2 w-full bg-inherit h-[200px] px-5 pr-16 pt-[20px] rounded-lg text-sm color-[#000] focus:border-current disabled:bg-blue-700 disabled:cursor-not-allowed",
    input:
      "border-2 w-full bg-inherit h-10 px-5 pr-16 p-[24px] rounded-lg text-sm color-[#000] focus:border-current disabled:bg-blue-500 disabled:cursor-not-allowed",
    btn: "bg-yellow-700 hover:bg-yellow-700 items-end text-black text-lg font-bold py-2 px-4 rounded-lg w-[100px] mt-[24px] disabled:bg-yellow-700 disabled:cursor-not-allowed",
  };
  return (
    <div className={style.container}>
      <h1 className="font-bold text-blue-500 text-3xl">
        {status} data test
      </h1>
      <form className={style.form}>
        <input
          placeholder="Id"
          type="text"
          className={style.input}
          value={data.id}
          onChange={(e) => setData({ ...data, id: e.target.value })}
        />
        {handleFunc() && (
          <input
            type="text"
            placeholder="data"
            className={style.input}
            value={data.user}
            disabled={true}
          />
        )}
        {handleFunc() ? (
          <textarea
            placeholder="data"
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
        {loading ? "wait" : `${status}`}
      </button>
      <span
        className="absolute bg-yellow-500 rounded-full w-[35px] h-[35px] text-xl top-[10px] right-[10px] text-center cursor-pointer"
        onClick={handle}
      >
        &#x2718;
      </span>
    </div>
  );
};

export default Modal;
