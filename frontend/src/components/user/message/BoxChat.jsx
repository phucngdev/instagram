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
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Input, Tooltip } from "antd";
import { sendInbox } from "../../../services/user/account.service";
import socketIOClient from "socket.io-client";
import { io } from "socket.io-client";

const BoxChat = ({ chatWith, userLogin }) => {
  const { id } = useParams();
  const host = "http://localhost:8080";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [messageChatWith, setMessageChatWith] = useState([]);
  const [messages, setMessages] = useState([]);
  const [checkChat, setCheckChat] = useState(true);
  const socketRef = useRef();
  const messagesEnd = useRef();

  const scrollToBottom = () => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  };

  // tạokk useEf để theo dõi id thay đổi thì thì setCheckChat(true);

  useEffect(() => {
    socketRef.current = socketIOClient.connect(host);
    socketRef.current.on("sendDataServer", (newMessage) => {
      const isMessageBetweenUsers =
        (newMessage.data.receiverId === userLogin?._id &&
          newMessage.data.senderId === chatWith?.userchat) ||
        (newMessage.data.receiverId === chatWith?.userchat &&
          newMessage.data.senderId === userLogin?._id);
      if (isMessageBetweenUsers) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      } else {
        setCheckChat(false);
      }
    });
    scrollToBottom();

    return () => {
      socketRef.current.disconnect();
    };
  }, [messages, chatWith]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (content == "") {
      return;
    }
    const newMessage = {
      senderId: userLogin?._id,
      receiverId: chatWith.userchat,
      content: content,
    };
    const mesSocket = {
      avatar: userLogin.avatar,
      username: userLogin.username,
      content: content,
      senderId: userLogin?._id,
      receiverId: chatWith.userchat,
    };
    socketRef.current.emit("sendDataClient", mesSocket);
    await dispatch(sendInbox(newMessage));
    setContent("");
    scrollToBottom();
  };

  return (
    <>
      {chatWith ? (
        <div className="flex-1 flex flex-col h-[100vh]">
          <header className="flex items-center justify-between px-3 pt-4 pb-3 bg-black border-b border-gray-800">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => navigate(`/${chatWith?.username}`)}
            >
              <img
                src={chatWith?.avatar}
                className="w-[56px] h-[56px] rounded-full object-cover bg-white me-3"
                alt=""
              />
              <div className="flex flex-col">
                <span className="text-white font-normal">
                  {chatWith?.username}
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
              {chatWith?.contentInbox?.map((ib) => (
                <div key={ib?._id}>
                  {ib?.sender?.username === id ? (
                    <>
                      <div className="flex justify-start items-center gap-2">
                        <img
                          src={ib?.sender?.avatar}
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
                          src={ib?.sender?.avatar}
                          alt=""
                          className="w-6 h-6 rounded-full object-cover"
                        />
                      </div>
                    </>
                  )}
                </div>
              ))}
              {checkChat &&
                messages.map((ib, index) => (
                  <div key={index}>
                    {ib.data.senderId === userLogin?._id ? (
                      <>
                        <div className="flex justify-end items-center gap-2">
                          <div className="max-w-[40%] px-3 py-1 bg-stone-700 rounded-s-full rounded-t-full text-white">
                            {ib.data.content}
                          </div>
                          <img
                            src={ib.data.avatar}
                            alt=""
                            className="w-6 h-6 rounded-full object-cover"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-start items-center gap-2">
                          <img
                            src={ib.data.avatar}
                            alt=""
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <div className="max-w-[40%] px-3 py-1 bg-stone-700 rounded-e-full rounded-t-full text-white">
                            {ib.data.content}
                          </div>
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
      ) : (
        <div className="flex-1 flex flex-col items-center gap-3 justify-center text-white">
          <div className="border-2 border-white rounded-full w-[120px] h-[120px] flex items-center justify-center">
            <WechatWorkOutlined className="text-6xl" />
          </div>
          <span className="text-2xl font-bold">Your messages</span>
          <p>Send private photos and messages to a friend or group</p>
        </div>
      )}
    </>
  );
};

export default BoxChat;
