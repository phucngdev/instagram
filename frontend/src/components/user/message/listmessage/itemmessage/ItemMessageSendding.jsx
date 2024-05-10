import { Popconfirm, Tooltip } from "antd";
import React from "react";
import formatTimeCreated from "../../../../../utils/FormatTimeCreated";
import {
  CopyOutlined,
  EnterOutlined,
  ExclamationCircleOutlined,
  MoreOutlined,
  SendOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";

const ItemMessageSendding = ({ contentSendding, errSend }) => {
  const userLogin = useSelector((state) => state.auth.data);

  return (
    <>
      <div className="group flex justify-end items-center gap-2">
        <div className="group-hover:flex hidden items-center gap-2 text-white text-base cursor-pointer">
          <Popconfirm
            placement="topRight"
            title={
              <>
                <span className="text-stone-400 px-2">
                  {formatTimeCreated(contentSendding?.createdAt)}
                </span>
              </>
            }
            description={
              <>
                <div className="flex items-center justify-between cursor-pointer text-white p-2 hover:bg-zinc-600 rounded-lg">
                  <span>Forward</span>
                  <SendOutlined />
                </div>
                <div className="flex items-center justify-between cursor-pointer text-white p-2 hover:bg-zinc-600 rounded-lg">
                  <span>Copy</span>
                  <CopyOutlined />
                </div>
                <div className="flex items-center justify-between cursor-pointer text-red-600 p-2 mt-2 hover:text-white hover:bg-red-600 rounded-lg">
                  <span>Delete</span>
                  <ExclamationCircleOutlined />
                </div>
              </>
            }
            icon={false}
            showCancel={false}
            className=""
          >
            <Tooltip title="More">
              <MoreOutlined />
            </Tooltip>
          </Popconfirm>
          <Tooltip title="Reply">
            <EnterOutlined />
          </Tooltip>
          <Tooltip title="React">
            <SmileOutlined />
          </Tooltip>
        </div>
        <div className="flex flex-col gap-1 max-w-[40%]">
          <div
            className={`px-3 py-1  rounded-s-full rounded-t-full text-white ${
              errSend ? "bg-red-500" : "bg-stone-700"
            }`}
          >
            {contentSendding?.content}
          </div>
          <div className="text-right text-[10px] text-white">
            {errSend ? "Lỗi khi gửi tin nhắn" : "...Đang gửi"}
          </div>
        </div>
        <img
          src={userLogin?.avatar}
          alt=""
          className="w-6 h-6 rounded-full object-cover"
        />
      </div>
    </>
  );
};

export default ItemMessageSendding;
