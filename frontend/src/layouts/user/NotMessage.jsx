import { WechatWorkOutlined } from "@ant-design/icons";
import React from "react";

const NotMessage = () => {
  return (
    <>
      <div className="flex-1 flex flex-col items-center gap-3 justify-center text-white">
        <div className="border-2 border-white rounded-full w-[120px] h-[120px] flex items-center justify-center">
          <WechatWorkOutlined className="text-6xl" />
        </div>
        <span className="text-2xl font-bold">Your messages</span>
        <p>Send private photos and messages to a friend or group</p>
      </div>
    </>
  );
};

export default NotMessage;
