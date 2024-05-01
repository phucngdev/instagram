import { PlusOutlined } from "@ant-design/icons";
import React from "react";

const HighLight = () => {
  return (
    <>
      <div className="flex items-center pb-7 border-b border-slate-500">
        <div className="flex flex-col gap-2 items-center text-white text-sm">
          <div className="w-[87px] h-[87px] cursor-pointer rounded-full text-slate-500 text-3xl border-slate-500 border flex items-center justify-center">
            <PlusOutlined />
          </div>
          <div>New</div>
        </div>
      </div>
    </>
  );
};

export default HighLight;
