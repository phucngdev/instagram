import {
  BellOutlined,
  GithubOutlined,
  LaptopOutlined,
  SafetyCertificateOutlined,
  SlackOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React from "react";
import { NavLink } from "react-router-dom";

const NavAccountService = () => {
  return (
    <>
      <nav className="flex flex-col w-[280px] h-full px-4 border-e border-[#282828] overflow-y-scroll">
        <h3 className="text-white text-xl font-medium ms-3 mt-10">Settings</h3>
        <div className="hover:bg-[#363636] cursor-pointer p-4 my-3 bg-[#262626] rounded-md text-white">
          <div className="flex items-center gap-2">
            <SlackOutlined className="text-[#016ae4] text-lg" />
            Meta
          </div>
          <h4 className="font-semibold my-2">Accounts Center</h4>
          <span className="text-[#a8a8a8] text-[12px]">
            Manage your connected experiences and account settings across Meta
            technologies.
          </span>
          <div className="flex items-center gap-2 text-[#a8a8a8] text-[12px] mt-2 ">
            <UserOutlined className="text-base" />
            Personal details
          </div>
          <div className="flex items-center gap-2 text-[#a8a8a8] text-[12px] mt-2 ">
            <SafetyCertificateOutlined className="text-base" />
            Password and security
          </div>
          <div className="flex items-center gap-2 text-[#a8a8a8] text-[12px] mt-2 mb-3">
            <LaptopOutlined className="text-base" />
            Ad preferences
          </div>
          <span className="text-[#016ae4] text-sm">
            See more in Accounts Center
          </span>
        </div>
        <span className="text-sm text-[#a8a8a8] font-semibold ms-3 mb-2">
          How you use Instagram
        </span>
        <NavLink
          to="/account/edit"
          className="w-full h-[52px] text-white flex items-center px-6 cursor-pointer gap-3 rounded-md hover:bg-[#363636]"
        >
          <UserOutlined />
          Edit profile
        </NavLink>
        <NavLink
          to="/"
          className="w-full h-[52px] text-white flex items-center px-6 cursor-pointer gap-3 rounded-md hover:bg-[#363636]"
        >
          <BellOutlined />
          Notifications
        </NavLink>
      </nav>
    </>
  );
};

export default NavAccountService;
