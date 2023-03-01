import React from "react";
import { GlobalContext } from "../context/ContextApi";

interface IPropsButton {
  name: string;
  color: string;
  handler: any;
}

const BtnComponent = ({ name, color, handler }: IPropsButton) => {
  const { setStatus } = React.useContext(GlobalContext);
  const style = {
    btn: `${color} btn text-gray-100 font-mono font-bold sm:w-[150px]`,
  };
  return (
    <label
      htmlFor="my-modal"
      className={style.btn}
      onClick={() => setStatus(name)}
    >
      {name}
    </label>
  );
};

const Transaction = () => {
  const [modal, setModal] = React.useState(false);

  const handlerModal = () => {
    setModal(!modal);
  };

  const BtnVal = [
    {
      name: "create",
      color: "bg-purple-500 hover:bg-purple-700 ",
      handler: handlerModal,
    },
    {
      name: "read",
      color: "bg-blue-500 hover:bg-blue-700",
      handler: null,
    },
    {
      name: "update",
      color: "bg-yellow-500 hover:bg-yellow-700",
      handler: null,
    },
    {
      name: "destroy",
      color: "bg-red-500 hover:bg-red-700",
      handler: null,
    },
  ];

  return (
    <div className="flex flex-col items-center gap-[40px]">
      <div className="flex gap-[24px] flex-wrap sm:flex-row">
        {BtnVal.map((item, index) => {
          return <BtnComponent {...item} key={index} />;
        })}
      </div>
    </div>
  );
};

export default Transaction;
