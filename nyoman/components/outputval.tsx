import React, { useContext } from "react";
import { GlobalContext } from "../context/context";

const Outputval = () => {
  const { output } = useContext(GlobalContext);
  return (
    <div className="flex flex-col bg-slate-600 w-[90vw] p-[24px] mt-[24px] text-white rounded gap-[24px]">
      <h2 className="font-bold text-xl">Output</h2>
      <pre>
        <code>{JSON.stringify(output, null, 2)}</code>
      </pre>
    </div>
  );
};

export default Outputval;
