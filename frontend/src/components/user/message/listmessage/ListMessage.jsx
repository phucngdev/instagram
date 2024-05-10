import React from "react";
import formatTimeCreated from "../../../../utils/FormatTimeCreated";
import checkDate from "../../../../utils/CheckDate";
import ItemMessage from "./itemmessage/ItemMessage";

const ListMessage = ({ messages, userChat }) => {
  return (
    <>
      {messages?.map((mes, index) => {
        const shouldDisplayDate =
          index === 0 ||
          !checkDate(messages[index - 1].createdAt, mes.createdAt);
        return (
          <>
            {shouldDisplayDate && (
              <div key={index} className="text-white text-center">
                {formatTimeCreated(mes.createdAt)}
              </div>
            )}
            <ItemMessage mes={mes} userChat={userChat} />
          </>
        );
      })}
    </>
  );
};

export default ListMessage;
