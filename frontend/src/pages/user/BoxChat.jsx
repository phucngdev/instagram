import {
  AudioOutlined,
  ExclamationCircleOutlined,
  HeartOutlined,
  PhoneOutlined,
  PictureOutlined,
  SmileOutlined,
  VideoCameraOutlined,
  WechatWorkOutlined,
} from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Input, Tooltip } from "antd";
import socketIOClient from "socket.io-client";
import { sendInbox } from "../../services/user/message.service";
import { getOneRoom } from "../../services/user/room.service";
import ListChat from "../../components/user/message/ListChat";
import Cookies from "js-cookie";

const BoxChat = () => {
  const { roomId, userId } = useParams();
  const host = "http://localhost:8080";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const socketRef = useRef();
  const messagesEnd = useRef();
  const roomChat = useSelector((state) => state.room.data);
  const [userLogin, setUserLogin] = useState(() => {
    const tokenObject = JSON.parse(Cookies.get("user"));
    return tokenObject;
  });
  const [content, setContent] = useState("");
  const [userChat, setUserChat] = useState({});
  const [messages, setMessages] = useState([]);

  const loadApiRoom = async () => {
    await dispatch(getOneRoom({ userId: userId, roomId: roomId }));
  };

  useEffect(() => {
    loadApiRoom();
  }, [userId, roomId]);

  useEffect(() => {
    if (roomChat) {
      const userChat = roomChat.findRoom?.member?.find(
        (member) => member._id !== userLogin?._id
      );
      setUserChat(userChat);
      setMessages(roomChat.findRoom?.contentInbox);
    }
  }, [roomId, roomChat]);

  const scrollToBottom = () => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    socketRef.current = socketIOClient.connect(host);
    socketRef.current.on("sendDataServer", (newMessage) => {
      // kiểm tra ngừoi nhận và ngừoi gửi
      const isMessageBetweenUsers =
        (newMessage.data.receiver === userLogin?._id &&
          newMessage.data.sender === userChat?._id) ||
        (newMessage.data.receiver === userChat?._id &&
          newMessage.data.sender === userLogin?._id);
      if (isMessageBetweenUsers) {
        setMessages((prevMessages) => [...prevMessages, newMessage.data]);
      }
    });
    scrollToBottom();

    return () => {
      socketRef.current.disconnect();
    };
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (content == "") {
      return;
    }
    const newMessage = {
      senderId: userLogin?._id,
      receiverId: userChat?._id,
      roomId: roomChat.findRoom?._id,
      content: content,
    };
    const mesSocket = {
      _id: uuidv4(),
      content: content,
      sender: userLogin?._id,
      receiver: userChat?._id,
    };
    socketRef.current.emit("sendDataClient", mesSocket);
    await dispatch(sendInbox(newMessage));
    setContent("");
    scrollToBottom();
  };

  return (
    <>
      <div className="flex">
        <ListChat userLogin={userLogin} />
        {roomChat && (
          <div className="w-[calc(100vw-350px-245px)] flex flex-col h-[100vh]">
            <header className="flex items-center justify-between px-3 pt-4 pb-3 bg-black border-b border-gray-800">
              <div
                className="flex items-center cursor-pointer"
                onClick={() => navigate(`/${userChat?.username}`)}
              >
                <img
                  src={userChat?.avatar}
                  className="w-[56px] h-[56px] rounded-full object-cover bg-white me-3"
                  alt=""
                />
                <div className="flex flex-col">
                  <span className="text-white font-normal">
                    {userChat?.username}
                  </span>
                  <span className="text-gray-400 text-sm">active 17h ago</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-white text-2xl cursor-pointer">
                <PhoneOutlined />
                <VideoCameraOutlined />
                <ExclamationCircleOutlined />
              </div>
            </header>
            <section className="flex-1 flex flex-col justify-end relative">
              <div className="flex-1 flex flex-col gap-3 p-3 absolute top-0 left-0 bottom-[60px] w-full overflow-y-scroll">
                {messages?.map((ib) => (
                  <div key={ib?._id}>
                    {ib?.sender !== userLogin?._id ? (
                      <>
                        <div className="flex justify-start items-center gap-2">
                          <img
                            src={userChat?.avatar}
                            alt=""
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <div className="max-w-[40%] px-3 py-1 bg-stone-700 rounded-e-full rounded-t-full text-white">
                            {ib?.content}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-end items-center gap-2">
                          <div className="max-w-[40%] px-3 py-1 bg-stone-700 rounded-s-full rounded-t-full text-white">
                            {ib?.content}
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
                ))}
              </div>
              <form
                onSubmit={handleSend}
                className="flex items-center justify-between p-3"
              >
                <div ref={messagesEnd}></div>
                <Input
                  className="bg-black text-white py-2 rounded-full hover:bg-black focus-within:bg-black"
                  placeholder="Message..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  prefix={<SmileOutlined className="text-white text-xl" />}
                  suffix={
                    content == "" ? (
                      <div className="flex items-center gap-2 text-white text-xl">
                        <Tooltip title="">
                          <AudioOutlined />
                        </Tooltip>
                        <Tooltip title="">
                          <HeartOutlined />
                        </Tooltip>
                        <Tooltip title="">
                          <PictureOutlined />
                        </Tooltip>
                      </div>
                    ) : (
                      <>
                        <button type="submit" className="text-blue-500">
                          Send
                        </button>
                      </>
                    )
                  }
                />
              </form>
            </section>
          </div>
        )}
      </div>
    </>
  );
};

export default BoxChat;
