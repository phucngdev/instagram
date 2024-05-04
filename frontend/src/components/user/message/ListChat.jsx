import {
  AntDesignOutlined,
  FormOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllRoom } from "../../../services/user/room.service";
import { Avatar, Tooltip } from "antd";

const ListChat = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.auth.data);
  const listRoom = useSelector((state) => state.room.list);

  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState(listRoom?.listroom);

  const loadListRoom = async () => {
    await dispatch(getAllRoom(userLogin?._id));
    setLoading(false);
  };

  useEffect(() => {
    loadListRoom();
  }, []);

  useEffect(() => {
    if (listRoom) {
      setRooms(listRoom.listroom);
      return;
    }
    setLoading(true);
    loadListRoom();
  }, [listRoom]);

  return (
    <>
      <div className="w-[350px] h-[100vh] border-e border-[#282828] overflow-scroll">
        <div className="px-6 pt-9 pb-3 text-white text-xl font-bold flex items-center justify-between">
          <h3>{userLogin?.username}</h3>
          <FormOutlined className="text-white" />
        </div>
        <div className="flex items-center justify-between px-6 pt-[14px] pb-[10px] ">
          <span className="text-white font-semibold">Messages</span>
          <span className="text-gray-400">Requests</span>
        </div>
        {loading ? (
          <div className="text-white text-center mt-10">Loading...</div>
        ) : (
          rooms?.roomchat.map((ib) => (
            <div
              key={ib._id}
              className="flex items-center px-6 py-2 cursor-pointer hover:bg-[#363636]"
              onClick={() => navigate(`/message/${ib?._id}/${userLogin?._id}`)}
            >
              <Avatar.Group
                maxCount={2}
                size="large"
                maxStyle={{
                  color: "#f56a00",
                  backgroundColor: "#fde3cf",
                }}
              >
                {ib?.member?.map(
                  (mb, index) =>
                    mb?._id !== userLogin?._id && (
                      <Avatar
                        key={index}
                        src={mb.avatar}
                        className="w-[56px] h-[56px] rounded-full object-cove"
                        alt=""
                      />
                    )
                )}
                {/* <Tooltip title="Ant User" placement="top">
                  <Avatar
                    style={{
                      backgroundColor: "#87d068",
                    }}
                    icon={<UserOutlined />}
                  />
                </Tooltip>
                <Avatar
                  style={{
                    backgroundColor: "#1677ff",
                  }}
                  icon={<AntDesignOutlined />}
                /> */}
              </Avatar.Group>
              <div className="flex flex-col ms-3">
                {ib?.member?.map((mb) => (
                  <div key={mb?._id} className="flex items-center gap-2">
                    <span className="text-white font-normal">
                      {mb?._id !== userLogin?._id && (
                        <>{mb.username || mb.phone}</>
                      )}
                    </span>
                  </div>
                ))}
                <span className="text-gray-400 text-sm">active 17h ago</span>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default ListChat;
