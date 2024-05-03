import React, { useState } from "react";
import logo from "../../../public/logo_text.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  AppstoreOutlined,
  BellOutlined,
  BookOutlined,
  CompassOutlined,
  IdcardOutlined,
  LoginOutlined,
  MenuOutlined,
  MessageOutlined,
  MoonOutlined,
  PinterestOutlined,
  PlaySquareOutlined,
  PlusOutlined,
  SearchOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Button, Modal, Spin } from "antd";
import { useDispatch } from "react-redux";
import { logout } from "../../services/user/auth.service";
import "../../assets/user/LayoutSidebar.css";
import Cookies from "js-cookie";
import DrawerSearch from "../../components/user/search/Drawer";
import ModalCreate from "../../components/user/post/ModalCreate";
// import ModalCreate from "./createpost/ModalCreate";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openMore, setOpenMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [open, setOpen] = useState(false); // search

  // search
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  // đăng xuất
  const handleLogout = () => {
    setIsLoading(true);
    setOpenMore(false);
    const tokenCookie = JSON.parse(Cookies.get("token"));
    setTimeout(async () => {
      await dispatch(logout(tokenCookie));
      Cookies.remove("user");
      Cookies.remove("token");
      setIsLoading(false);
      navigate("/accounts/login");
    }, 2000);
  };

  return (
    <>
      {isLoading && (
        <>
          <div className="fixed z-[999] top-0 left-0 right-0 bottom-0 flex mt-10 justify-center">
            <Spin />
          </div>
        </>
      )}
      <DrawerSearch onClose={onClose} open={open} />
      <ModalCreate openCreate={openCreate} setOpenCreate={setOpenCreate} />
      <div className="fixed bg-black left-0 top-0 flex flex-col justify-between w-[245px] h-full overflow-hidden px-2 border-e border-gray-800">
        <div className="flex flex-col">
          <NavLink
            to="/"
            className="w-[175px] h-[51px] relative overflow-hidden mt-9 mb-3 mx-auto"
          >
            <img className="absolute top-[-50px] left-0" src={logo} alt="" />
          </NavLink>
          <NavLink
            to="/"
            className="w-full h-[52px] mt-6 text-white flex items-center px-6 cursor-pointer gap-3 rounded-md hover:bg-[#363636]"
          >
            <AppstoreOutlined />
            Home
          </NavLink>
          <button
            onClick={showDrawer}
            className="w-full h-[52px] text-white flex items-center px-6 cursor-pointer gap-3 rounded-md hover:bg-[#363636]"
          >
            <SearchOutlined />
            Search
          </button>
          <NavLink
            to="/explore"
            className="w-full h-[52px] text-white flex items-center px-6 cursor-pointer gap-3 rounded-md hover:bg-[#363636]"
          >
            <CompassOutlined />
            Explore
          </NavLink>
          <NavLink
            to="/reels"
            className="w-full h-[52px] text-white flex items-center px-6 cursor-pointer gap-3 rounded-md hover:bg-[#363636]"
          >
            <PlaySquareOutlined />
            Reels
          </NavLink>
          <NavLink
            to="/message"
            className="w-full h-[52px] text-white flex items-center px-6 cursor-pointer gap-3 rounded-md hover:bg-[#363636]"
          >
            <MessageOutlined />
            Messages
          </NavLink>
          <NavLink
            to="/notification"
            className="w-full h-[52px] text-white flex items-center px-6 cursor-pointer gap-3 rounded-md hover:bg-[#363636]"
          >
            <BellOutlined />
            Notification
          </NavLink>
          <button
            onClick={() => setOpenCreate(true)}
            className="w-full h-[52px] text-white flex items-center px-6 cursor-pointer gap-3 rounded-md hover:bg-[#363636]"
          >
            <PlusOutlined />
            Create
          </button>
          <NavLink
            to="/profile"
            className="w-full h-[52px] text-white flex items-center px-6 cursor-pointer gap-3 rounded-md hover:bg-[#363636]"
          >
            <IdcardOutlined />
            Profile
          </NavLink>
        </div>
        <div className="flex flex-col mb-10">
          <button className="w-full h-[52px] text-white flex items-center px-6 cursor-pointer gap-3 rounded-md hover:bg-[#363636]">
            <PinterestOutlined />
            Threads
          </button>
          <button
            onClick={() => setOpenMore(true)}
            className="w-full h-[52px] text-white flex items-center px-6 cursor-pointer gap-3 rounded-md hover:bg-[#363636]"
          >
            <MenuOutlined />
            More
          </button>
          <Modal
            className="fixed left-[20px] top-[50%] p-0 m-0 shadow-md rounded-lg shadow-[#363636] text-white"
            open={openMore}
            onOk={() => setOpenMore(false)}
            onCancel={() => setOpenMore(false)}
            footer={false}
            width={250}
            closeIcon={false}
          >
            <div className="flex flex-col gap-3 bg-black p-0">
              <NavLink
                to="/setting"
                className="w-full h-[52px] hover:text-white text-white flex items-center px-2 cursor-pointer gap-3 rounded-md hover:bg-[#363636]"
              >
                <SettingOutlined />
                Settings
              </NavLink>
              <NavLink
                to="/save"
                className="w-full h-[52px] hover:text-white text-white flex items-center px-2 cursor-pointer gap-3 rounded-md hover:bg-[#363636]"
              >
                <BookOutlined />
                Save
              </NavLink>
              <NavLink
                to="/save"
                className="w-full h-[52px] hover:text-white text-white flex items-center px-2 cursor-pointer gap-3 rounded-md hover:bg-[#363636]"
              >
                <MoonOutlined />
                Switch appearance
              </NavLink>
              <div className="w-full h-[1px] bg-white"></div>
              <button
                onClick={handleLogout}
                className="w-full h-[52px]   text-white flex items-center px-2 cursor-pointer gap-3 rounded-md hover:bg-[#363636]"
              >
                <LoginOutlined />
                Log out
              </button>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
