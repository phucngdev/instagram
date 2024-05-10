import { Avatar } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ItemChat = ({ ib }) => {
  const userLogin = useSelector((state) => state.auth.data);
  const navigate = useNavigate();

  return (
    <>
      <div
        key={ib._id}
        className="flex items-center px-6 py-2 cursor-pointer hover:bg-[#363636]"
        onClick={() => navigate(`/message/${ib?._id}/${userLogin?._id}`)}
      >
        <Avatar.Group
          maxCount={2}
          size="large"
          maxStyle={{
            color: "#f56a00",
            backgroundColor: "#fde3cf",
          }}
        >
          {ib?.member?.map(
            (mb, index) =>
              mb?._id !== userLogin?._id && (
                <Avatar
                  key={index}
                  src={mb.avatar}
                  className="w-[56px] h-[56px] rounded-full object-cove"
                  alt=""
                />
              )
          )}
        </Avatar.Group>
        <div className="flex flex-col ms-3">
          {ib?.member?.map((mb) => (
            <div key={mb?._id} className="flex items-center gap-2">
              <span className="text-white font-normal">
                {mb?._id !== userLogin?._id && <>{mb.username || mb.phone}</>}
              </span>
            </div>
          ))}
          <span className="text-gray-400 text-sm">active 17h ago</span>
        </div>
      </div>
    </>
  );
};

export default ItemChat;
