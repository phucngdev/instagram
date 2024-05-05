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
import ListChat from "../../components/user/message/ListChat";
import formatTimeCreated from "../../utils/FormatTimeCreated";
import checkDate from "../../utils/CheckDate";
import { Helmet } from "react-helmet";

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
                {messages?.map((ib, index) => {
                  const shouldDisplayDate =
                    index === 0 ||
                    !checkDate(messages[index - 1].createdAt, ib.createdAt);
                  return (
                    <>
                      {shouldDisplayDate && (
                        <div key={index} className="text-white text-center">
                          {formatTimeCreated(ib.createdAt)}
                        </div>
                      )}
                      <div key={ib?._id}>
                        {ib?.sender !== userLogin?._id ? (
                          <>
                            <div className="group flex justify-start items-center gap-2">
                              <img
                                src={userChat?.avatar}
                                alt=""
                                className="w-6 h-6 rounded-full object-cover"
                              />
                              <div className="max-w-[40%] px-3 py-1 bg-stone-700 rounded-e-full rounded-t-full text-white">
                                {ib?.content}
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
                                        {formatTimeCreated(ib?.createdAt)}
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
                                        {formatTimeCreated(ib?.createdAt)}
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
                    </>
                  );
                })}
                {sendding && (
                  <div className="group flex justify-end items-center gap-2">
                    <div className="group-hover:flex hidden items-center gap-2 text-white text-base cursor-pointer">
                      <Popconfirm
                        placement="topRight"
                        title={
                          <>
                            <span className="text-stone-400 px-2">
                              {formatTimeCreated(contentSendding?.createdAt)}
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
                    <div className="flex flex-col gap-1 max-w-[40%]">
                      <div
                        className={`px-3 py-1  rounded-s-full rounded-t-full text-white ${
                          errSend ? "bg-red-500" : "bg-stone-700"
                        }`}
                      >
                        {contentSendding?.content}
                      </div>
                      <div className="text-right text-[10px] text-white">
                        {errSend ? "Lỗi khi gửi tin nhắn" : "...Đang gửi"}
                      </div>
                    </div>
                    <img
                      src={userLogin?.avatar}
                      alt=""
                      className="w-6 h-6 rounded-full object-cover"
                    />
                  </div>
                )}
                <div ref={messagesEnd}></div>
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
