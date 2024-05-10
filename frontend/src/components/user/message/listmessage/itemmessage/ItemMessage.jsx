import {
  CopyOutlined,
  EnterOutlined,
  ExclamationCircleOutlined,
  MoreOutlined,
  SendOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { Popconfirm, Tooltip } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import formatTimeCreated from "../../../../../utils/FormatTimeCreated";

const ItemMessage = ({ mes, userChat }) => {
  const userLogin = useSelector((state) => state.auth.data);

  return (
    <>
      <div key={mes?._id}>
        {mes?.sender !== userLogin?._id ? (
          <>
            <div className="group flex justify-start items-center gap-2">
              <img
                src={userChat?.avatar}
                alt=""
                className="w-6 h-6 rounded-full object-cover"
              />
              <div className="max-w-[40%] px-3 py-1 bg-stone-700 rounded-e-full rounded-t-full text-white">
                {mes?.content}
              </div>
              <div className="group-hover:flex hidden items-center gap-2 text-white text-base cursor-pointer">
                <Tooltip title="React">
                  <SmileOutlined />
                </Tooltip>
                <Tooltip title="Reply">
                  <EnterOutlined />
                </Tooltip>
                <Popconfirm
                  placement="topLeft"
                  title={
                    <>
                      <span className="text-stone-400 px-2">
                        {formatTimeCreated(mes?.createdAt)}
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
                >
                  <Tooltip title="More">
                    <MoreOutlined />
                  </Tooltip>
                </Popconfirm>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="group flex justify-end items-center gap-2">
              <div className="group-hover:flex hidden items-center gap-2 text-white text-base cursor-pointer">
                <Popconfirm
                  placement="topRight"
                  title={
                    <>
                      <span className="text-stone-400 px-2">
                        {formatTimeCreated(mes?.createdAt)}
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
              <div className="max-w-[40%] px-3 py-1 bg-stone-700 rounded-s-full rounded-t-full text-white">
                {mes?.content}
              </div>
              <img
                src={userLogin?.avatar}
                alt=""
                className="w-6 h-6 rounded-full object-cover"
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ItemMessage;
