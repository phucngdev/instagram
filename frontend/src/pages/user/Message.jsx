import React, { useState } from "react";
import ListChat from "../../components/user/message/ListChat";
import NotMessage from "../../layouts/user/NotMessage";
import Cookies from "js-cookie";
import { Helmet } from "react-helmet";

const Message = () => {
  const [userLogin, setUserLogin] = useState(() => {
    const tokenObject = JSON.parse(Cookies.get("user"));
    return tokenObject;
  });
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
