import React from "react";
import ListChat from "../../components/user/message/listchat/ListChat";
import NotMessage from "../../layouts/user/NotMessage";
import { Helmet } from "react-helmet";

const Message = () => {
  return (
    <>
      <Helmet>
        <title>Message - Instagram</title>
      </Helmet>
      <div className="flex">
        <ListChat />
        <NotMessage />
      </div>
    </>
  );
};

export default Message;
