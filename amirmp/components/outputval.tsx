import { GlobalContext } from "../context/context";
import React, { useContext } from "react";

const Outputval = () => {
  const { output } = useContext(GlobalContext);
  return (
    <div className="flex flex-col bg-yellow-600 w-[90vw] p-[24px] mt-[24px] text-white rounded gap-[24px]">
      <h2 className="font-bold text-4xl">Database</h2>
      <pre>
        <code>{JSON.stringify(output, null, 2)}</code>
      </pre>
    </div>
  );
};

export default Outputval;
