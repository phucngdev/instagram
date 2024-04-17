import React, { useState } from "react";
import ListChat from "../../components/user/message/ListChat";
import BoxChat from "../../components/user/message/BoxChat";
import Cookies from "js-cookie";

const Message = () => {
  const [chatWith, setChatWith] = useState(null);
  const [userLogin, setUserLogin] = useState(() => {
    const tokenObject = JSON.parse(Cookies.get("user"));
    return tokenObject;
  });
  console.log(chatWith);

  return (
    <>
      <div className="flex">
        <ListChat setChatWith={setChatWith} userLogin={userLogin} />
        <BoxChat chatWith={chatWith} userLogin={userLogin} />
      </div>
    </>
  );
};

export default Message;
