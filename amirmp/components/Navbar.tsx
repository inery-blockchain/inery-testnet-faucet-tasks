import React, { useContext } from "react";

const Navbar = () => {
  const style = {
    container: "flex flex-col items-center justify-center py-2 gap-[12px]",
  };
  return (
    <div className={style.container}>
      <img
        src="/amirmp.svg"
        className="w-[120px] h-[120px] rounded-full"
      />
      <div className="text-yellow text-center">
        <h2 className="font-bold text-4xl mb-[12px]">Decentralized application based on Inery Blockchain</h2>
        <p className="text-yellow-500 text-4xl font-bold">
          Task 5 By{" "}
          <span className="text-4xl font-bold">amirmp</span>
          <br /> check the functions below
        </p>
      </div>
    </div>
  );
};

export default Navbar;
