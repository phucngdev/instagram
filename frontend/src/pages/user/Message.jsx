import React, { useState } from "react";
import ListChat from "../../components/user/message/ListChat";
import NotMessage from "../../layouts/user/NotMessage";
import Cookies from "js-cookie";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

const Message = () => {
  const userLogin = useSelector((state) => state.userLogin.data);

  return (
    <>
      <Helmet>
        <title>Message - Instagram</title>
      </Helmet>
      <div className="flex">
        <ListChat userLogin={userLogin} />
        <NotMessage />
      </div>
    </>
  );
};

export default Message;
