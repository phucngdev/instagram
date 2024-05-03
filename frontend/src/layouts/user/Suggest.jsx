import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Suggest = () => {
  const userLogin = useSelector((state) => state.userLogin.data);

  return (
    <>
      <div className="fixed top-0 right-0 bg-black flex flex-col py-9 w-[400px] px-[64px] h-[100vh]">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            {userLogin?.avatar ? (
              <img
                className="w-[44px] h-[44px] rounded-full object-cover"
                src={userLogin.avatar}
                alt=""
              />
            ) : (
              <Link>
                <Avatar
                  size="large"
                  className="bg-gray-500"
                  icon={<UserOutlined className="text-white " />}
                />
              </Link>
            )}
            <div className="flex flex-col">
              <Link
                to={`/${userLogin.username}`}
                className="text-[#f5f5f5] text-sm font-bold"
              >
                {userLogin.username}
              </Link>
              <span className="text-[#a8a8a8] font-light text-sm">
                {userLogin?.name}
              </span>
            </div>
          </div>
          <span className="text-[12px] font-semibold text-[#0095f6]">
            Switch
          </span>
        </div>
      </div>
    </>
  );
};

export default Suggest;
