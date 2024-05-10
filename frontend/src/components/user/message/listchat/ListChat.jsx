import { FormOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRoom } from "../../../../services/user/room.service";
import ItemChat from "./itemchat/ItemChat";

const ListChat = () => {
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
          rooms?.roomchat.map((ib) => <ItemChat ib={ib} />)
        )}
      </div>
    </>
  );
};

export default ListChat;
