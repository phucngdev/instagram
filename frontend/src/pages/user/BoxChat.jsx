import {
  AudioOutlined,
  CopyOutlined,
  EnterOutlined,
  ExclamationCircleOutlined,
  HeartOutlined,
  MoreOutlined,
  PhoneOutlined,
  PictureOutlined,
  SendOutlined,
  SmileOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Input, Popconfirm, Tooltip } from "antd";
import socketIOClient from "socket.io-client";
import { sendInbox } from "../../services/user/message.service";
import { getOneRoom } from "../../services/user/room.service";
import formatTimeCreated from "../../utils/FormatTimeCreated";
import checkDate from "../../utils/CheckDate";
import { Helmet } from "react-helmet";
import ListChat from "../../components/user/message/listchat/ListChat";
import ListMessage from "../../components/user/message/listmessage/ListMessage";
import ItemMessageSendding from "../../components/user/message/listmessage/itemmessage/ItemMessageSendding";

const BoxChat = () => {
  const { roomId, userId } = useParams();
  const host = import.meta.env.VITE_HOST_SOCKET;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const socketRef = useRef();
  const messagesEnd = useRef();
  const roomChat = useSelector((state) => state.room.data);
  const userLogin = useSelector((state) => state.auth.data);

  const [content, setContent] = useState("");
  const [userChat, setUserChat] = useState({});
  const [messages, setMessages] = useState([]);
  const [sendding, setSendding] = useState(false);
  const [contentSendding, setContentSendding] = useState({});
  const [errSend, setErrSend] = useState(false);

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

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  };

  // lấy tin nhắn mới nhất
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
      status: 0,
      createdAt: new Date(),
    };
    setContentSendding(mesSocket);
    setSendding(true);
    setContent("");
    const respones = await dispatch(sendInbox(newMessage));
    if (respones?.payload?.status === 201) {
      // gửi tin nhắn qua emit
      socketRef.current.emit("sendDataClient", mesSocket);
      socketRef.current.emit("newNotification", newMessage);
      setContentSendding({});
      setSendding(false);
    } else {
      setErrSend(true);
    }
    scrollToBottom();
  };

  return (
    <>
      <Helmet>
        <title>Message - Chats - Instagram</title>
      </Helmet>
      <div className="flex">
        <ListChat />
        {roomChat && (
          <div className="w-[calc(100vw-350px-245px)] flex flex-col h-[100vh]">
            <header className="flex items-center justify-between px-3 pt-4 pb-3 bg-black border-b border-[#282828] ">
              <div
                className="flex items-center cursor-pointer"
                onClick={() => navigate(`/${userChat?.phone}`)}
              >
                <img
                  src={userChat?.avatar}
                  className="w-[56px] h-[56px] rounded-full object-cover bg-white me-3"
                  alt=""
                />
                <div className="flex flex-col">
                  <span className="text-white font-normal">
                    {userChat?.username || userChat?.phone}
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
                <div className="flex flex-col items-center mx-auto text-white mb-10">
                  <img
                    src={userChat?.avatar}
                    className="w-[96px] h-[96px] rounded-full object-cover mb-3"
                    alt=""
                  />
                  <h4 className="text-2xl font-bold my-1">
                    {userChat?.username}
                  </h4>
                  <span className="text-gray-300">instagram</span>
                  <Button
                    type="default"
                    className="bg-[#262626] text-white my-3"
                  >
                    View Profile
                  </Button>
                </div>
                <ListMessage messages={messages} userChat={userChat} />
                {sendding && (
                  <ItemMessageSendding
                    contentSendding={contentSendding}
                    errSend={errSend}
                  />
                )}
                <div ref={messagesEnd} className="mb-9"></div>
              </div>
              <form
                onSubmit={handleSend}
                className="flex items-center justify-between p-3"
              >
                <Input
                  className="bg-black text-white py-2 rounded-full hover:bg-black focus-within:bg-black placeholder-white"
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
