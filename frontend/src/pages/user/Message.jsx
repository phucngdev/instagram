import React, { useState } from "react";
import ListChat from "../../components/user/message/ListChat";
import NotMessage from "../../layouts/user/NotMessage";
import Cookies from "js-cookie";

const Message = () => {
  const [userLogin, setUserLogin] = useState(() => {
    const tokenObject = JSON.parse(Cookies.get("user"));
    return tokenObject;
  });
  return (
    <>
      <div className="flex">
        <ListChat userLogin={userLogin} />
        <NotMessage />
      </div>
    </>
  );
};

export default Message;
