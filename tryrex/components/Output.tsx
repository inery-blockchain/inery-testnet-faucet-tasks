import React from "react";
import { GlobalContext } from "../context/context";

const Output = () => {
  const { output } = React.useContext(GlobalContext);
  const style = {
    container:
      "flex w-[90vw] flex-col justify-center py-2 gap-4 bg-gray-900 rounded-md px-[24px] py-[22px] ",
  };

  return (
    <div className={style.container}>
      <h1 className="text-white">Output</h1>
      <pre>
        <code className="text-[#fff]">{JSON.stringify(output, null, 2)}</code>
      </pre>
    </div>
  );
};

export default Output;
