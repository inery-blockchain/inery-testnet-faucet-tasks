import React, { useContext, useEffect } from "react";
import Modal from "../modals/Modal";
import { GlobalContext } from "../context/context";

interface IPropsButton {
  name: string;
  color: string;
  handle: any;
}

const ButtonAction = ({ name, color, handle }: IPropsButton) => {
  const style = {
    btn: `${color} text-white font-bold py-2 px-4 rounded w-[140px]`,
  };

  return (
    <button className={style.btn} onClick={handle}>
      {name}
    </button>
  );
};

const Homepage = () => {
  const [modal, setModal] = React.useState(false);
  const { loading, setStatus, Create, ReadData } = useContext(GlobalContext);
  const [current, setCurrent] = React.useState<any>(false);

  const handleModal = () => {
    setModal(!modal);
    setStatus("create");
  };

  const readHandler = () => {
    setCurrent(!current);
    setStatus("read");
  };

  const updateHandler = () => {
    setModal(!modal);
    setStatus("update");
  };

  const destroyHandler = () => {
    setCurrent(!current);
    setStatus("destroy");
  };

  useEffect(() => {
    if (loading) return;
    setModal(false);
    setCurrent(false);
  }, [loading]);

  const btn = [
    {
      name: "Create",
      color: "bg-blue-500 hover:bg-blue-700",
      handle: handleModal,
    },
    {
      name: "Read",
      color: "bg-red-500 hover:bg-red-700",
      handle: readHandler,
    },
    {
      name: "Update",
      color: "bg-yellow-500 hover:bg-yellow-700",
      handle: updateHandler,
    },
    {
      name: "Delete",
      color: "bg-purple-500 hover:bg-purple-700 ",
      handle: destroyHandler,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center py-4 gap-[74px] pt-[24px]">
      <div className="flex gap-[24px] mt-[24px] justify-center">
        {btn.map((item, index) => {
          return <ButtonAction {...item} key={index} />;
        })}
      </div>
      <span className="w-[90vw] h-[2px] bg-gray-300"></span>
      {modal && <Modal handle={handleModal} handlerData={Create} />}
      {current && <Modal handle={readHandler} handlerData={ReadData} />}
    </div>
  );
};

export default Homepage;
