import React from "react";
import { GlobalContext } from "../context/ContextApi";

const Output = () => {
  const { output } = React.useContext(GlobalContext);

  return (
    <div className="flex flex-col gap-[20px]">
      <span className="w-[90vw] h-[6px] rounded-lg bg-gray-900"></span>
      <div className="mockup-code w-[90vw] ">
        <pre data-prefix="$">
          <code>{JSON.stringify(output, null, 2)}</code>
        </pre>
      </div>
    </div>
  );
};

export default Output;
