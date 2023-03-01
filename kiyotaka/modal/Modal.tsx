import React from "react";
import { GlobalContext } from "../context/ContextApi";

const Modal = () => {
  const { Create, ReadData, loading, status, data, setData } =
    React.useContext(GlobalContext);
  const handlerSubmit = () => {
    if (status === "create" || status === "update") {
      return Create({ ...data });
    }
    return ReadData({ id: data.id });
  };

  const style = {
    form: "flex flex-col gap-[12px] w-full gap-[24px]",
    input: "input input-bordered p-[12px]",
    textarea: "input input-bordered h-[200px] p-[12px] resize-none w-full ",
  };

  const handlerStatus = () => {
    if (status === "create" || status === "update") {
      return true;
    }
    return false;
  };

  return (
    <div>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box flex flex-col gap-[24px] items-start relative">
          <label
            htmlFor="my-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h2 className="font-bold text-xl font-sans">
            {status} data to inery
          </h2>
          <form className={style.form}>
            <input
              className={style.input}
              placeholder="type any number"
              value={data.id}
              onChange={(e) => setData({ ...data, id: e.target.value })}
            />
            {handlerStatus() && (
              <input
                value={data.user}
                disabled={true}
                className={style.input}
              />
            )}
            {handlerStatus() && (
              <textarea
                className={style.textarea}
                placeholder="type any data"
              />
            )}
          </form>
          <label htmlFor={"my-modal"} className="btn" onClick={handlerSubmit}>
            {loading ? "loading..." : status}
          </label>
        </div>
      </div>
    </div>
  );
};

export default Modal;
