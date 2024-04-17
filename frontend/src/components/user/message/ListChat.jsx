import { FormOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getInbox } from "../../../services/user/account.service";
import Cookies from "js-cookie";

const ListChat = ({ setChatWith, userLogin }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const listChat = useSelector((state) => state.account.list);

  const loadApiChat = async () => {
    await dispatch(getInbox(userLogin?.username));
  };
  useEffect(() => {
    loadApiChat();
  }, []);

  const handleChatWithFriend = (user) => {
    navigate(`/message/${user?.username}`);
    setChatWith(user);
  };

  return (
    <>
      <div className="w-[350px] h-[100vh] border-e border-gray-800">
        <div className="px-6 pt-9 pb-3 text-white text-xl font-bold flex items-center justify-between">
          <h3>{userLogin?.username}</h3>
          <FormOutlined className="text-white" />
        </div>

        <div className="flex items-center justify-between px-6 pt-[14px] pb-[10px] ">
          <span className="text-white font-semibold">Messages</span>
          <span className="text-gray-400">Requests</span>
        </div>
        {listChat?.inbox?.map((ib, index) => (
          <div
            key={index}
            className="flex items-center px-6 py-2 cursor-pointer hover:bg-stone-800"
            onClick={() => handleChatWithFriend(ib)}
          >
            <img
              src={ib?.avatar}
              className="w-[56px] h-[56px] rounded-full object-cover bg-white me-3"
              alt=""
            />
            <div className="flex flex-col">
              <span className="text-white font-normal">{ib?.username}</span>
              <span className="text-gray-400 text-sm">active 17h ago</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ListChat;
