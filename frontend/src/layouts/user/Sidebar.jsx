import React, { useState } from "react";
import logo from "../../../public/logo_text.png";
import { Link, useNavigate } from "react-router-dom";
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
import { Modal, Spin } from "antd";
import { useDispatch } from "react-redux";
import { logout } from "../../services/user/auth.service";
import "../../assets/user/LayoutSidebar.css";
import Cookies from "js-cookie";
// import ModalCreate from "./createpost/ModalCreate";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openMore, setOpenMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);

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
      <div className="fixed bg-black left-0 top-0 flex flex-col justify-between w-[245px] h-full overflow-hidden px-2 border-e border-gray-800">
        <div className="flex flex-col">
          <Link
            to="/"
            className="w-[175px] h-[51px] relative overflow-hidden mt-9 mb-3 mx-auto"
          >
            <img className="absolute top-[-50px] left-0" src={logo} alt="" />
          </Link>
          <Link
            to="/"
            className="w-full h-[52px] mt-6 text-white flex items-center px-6 cursor-pointer gap-3 rounded-md hover:bg-gray-800"
          >
            <AppstoreOutlined />
            Home
          </Link>
          <Link
            to="/search"
            className="w-full h-[52px] text-white flex items-center px-6 cursor-pointer gap-3 rounded-md hover:bg-gray-800"
          >
            <SearchOutlined />
            Search
          </Link>
          <Link
            to="/explore"
            className="w-full h-[52px] text-white flex items-center px-6 cursor-pointer gap-3 rounded-md hover:bg-gray-800"
          >
            <CompassOutlined />
            Explore
          </Link>
          <Link
            to="/reels"
            className="w-full h-[52px] text-white flex items-center px-6 cursor-pointer gap-3 rounded-md hover:bg-gray-800"
          >
            <PlaySquareOutlined />
            Reels
          </Link>
          <Link
            to="/messages"
            className="w-full h-[52px] text-white flex items-center px-6 cursor-pointer gap-3 rounded-md hover:bg-gray-800"
          >
            <MessageOutlined />
            Messages
          </Link>
          <Link
            to="/notification"
            className="w-full h-[52px] text-white flex items-center px-6 cursor-pointer gap-3 rounded-md hover:bg-gray-800"
          >
            <BellOutlined />
            Notification
          </Link>
          <button
            onClick={() => setOpenCreate(true)}
            className="w-full h-[52px] text-white flex items-center px-6 cursor-pointer gap-3 rounded-md hover:bg-gray-800"
          >
            <PlusOutlined />
            Create
          </button>
          {/* <ModalCreate
            openCreate={openCreate}
            setOpenCreate={setOpenCreate}
          ></ModalCreate> */}
          <Link
            to="/profile"
            className="w-full h-[52px] text-white flex items-center px-6 cursor-pointer gap-3 rounded-md hover:bg-gray-800"
          >
            <IdcardOutlined />
            Profile
          </Link>
        </div>
        <div className="flex flex-col mb-10">
          <button className="w-full h-[52px] text-white flex items-center px-6 cursor-pointer gap-3 rounded-md hover:bg-gray-800">
            <PinterestOutlined />
            Threads
          </button>
          <button
            onClick={() => setOpenMore(true)}
            className="w-full h-[52px] text-white flex items-center px-6 cursor-pointer gap-3 rounded-md hover:bg-gray-800"
          >
            <MenuOutlined />
            More
          </button>
          <Modal
            className="fixed left-[20px] top-[50%] p-0 m-0 shadow-md rounded-lg shadow-stone-600"
            open={openMore}
            onOk={() => setOpenMore(false)}
            onCancel={() => setOpenMore(false)}
            footer={false}
            width={250}
            closeIcon={false}
          >
            <div className="flex flex-col gap-3 bg-black p-0">
              <Link
                to="/setting"
                className="w-full h-[52px] text-white flex items-center px-2 cursor-pointer gap-3 rounded-md hover:bg-slate-600"
              >
                <SettingOutlined />
                Settings
              </Link>
              <Link
                to="/save"
                className="w-full h-[52px] text-white flex items-center px-2 cursor-pointer gap-3 rounded-md hover:bg-slate-600"
              >
                <BookOutlined />
                Save
              </Link>
              <Link
                to="/save"
                className="w-full h-[52px] text-white flex items-center px-2 cursor-pointer gap-3 rounded-md hover:bg-slate-600"
              >
                <MoonOutlined />
                Switch appearance
              </Link>
              <button
                onClick={handleLogout}
                className="w-full h-[52px] border-t border-gray-500  text-white flex items-center px-2 cursor-pointer gap-3 rounded-md hover:bg-slate-600"
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
