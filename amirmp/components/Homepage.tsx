import { GlobalContext } from "../context/context";
import React, { useContext, useEffect } from "react";
import Modal from "../modals/Modal";

interface IPropsButton {
  name: string;
  color: string;
  handle: any;
}

const ButtonAction = ({ name, color, handle }: IPropsButton) => {
  const style = {
    btn: `${color} text-yellow font-bold py-2 px-4 rounded w-[140px]`,
  };

  return (
    <button className={style.btn} onClick={handle}>
      {name}
    </button>
  );
};

const Homepage = () => {
  const [modal, setModal] = React.useState(false);
  const { loading, setStatus, Create, Destroy, ReadData } = useContext(GlobalContext);
  const [current, setCurrent] = React.useState<any>(false);

  const handleModal = () => {
    setModal(!modal);
    setStatus("create");
  };

  const destroyHandler = () => {
    setCurrent(!current);
    setStatus("destroy");
  };

  const readHandler = () => {
    setCurrent(!current);
    setStatus("read");
  };

  useEffect(() => {
    if (loading) return;
    setModal(false);
    setCurrent(false);
  }, [loading]);

  const btn = [
    {
      name: "Create transaction",
      color: "bg-white-300 hover:bg-white-300",
      handle: handleModal,
    },
    {
      name: "Read",
      color: "bg-purple-500 hover:bg-purple-700",
      handle: readHandler,
    },
    {
      name: "Destroy transaction",
      color: "bg-white-300 hover:bg-white-300",
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
      <span className="w-[90vw] h-[2px] bg-yellow-500"></span>
      {modal && <Modal handle={handleModal} handlerData={Create} />}
      {current && <Modal handle={readHandler} handlerData={ReadData} />}
    </div>
  );
};

export default Homepage;
