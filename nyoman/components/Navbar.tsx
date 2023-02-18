import React, { useContext } from "react";

const Navbar = () => {
  const style = {
    container: "flex flex-col items-center justify-center py-2 gap-[12px]",
  };
  return (
    <div className={style.container}>
      <img
        src="https://i.pinimg.com/736x/82/ee/91/82ee914276b9037d473cdc1e50ebae09.jpg"
        className="w-[120px] h-[120px] rounded-full"
      />
      <div className="text-white text-center">
        <h2 className="font-bold text-xl mb-[12px]">Inery Crud Dapps</h2>
        <p className="text-gray-300">
          Inery Crud using NextJs By{" "}
          <span className="text-xl font-bold">Nyoman</span>
          <br /> after submiting the form, you can see the data in the
          transaction below
        </p>
      </div>
    </div>
  );
};

export default Navbar;
