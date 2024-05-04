import React, { useState } from "react";
import ListChat from "../../components/user/message/ListChat";
import NotMessage from "../../layouts/user/NotMessage";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

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
