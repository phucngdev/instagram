import { HeartFilled, MessageFilled } from "@ant-design/icons";
import React, { useState } from "react";
import DetailPost from "./detailpost/DetailPost";
import { useSelector } from "react-redux";
import formatTimeCreated from "../../../../../utils/FormatTimeCreated";

const PostProfile = ({ p }) => {
  const [openDetailPost, setOpenDetailPost] = useState(false);
  const user = useSelector((state) => state.account.data?.result);

  return (
    <>
      <DetailPost
        openDetailPost={openDetailPost}
        setOpenDetailPost={setOpenDetailPost}
        p={p}
      />
      <div
        onClick={() => setOpenDetailPost(true)}
        key={p?._id}
        className="group relative w-[310px] h-[310px] flex items-center justify-center cursor-pointer border rounded-sm text-white"
      >
        {p?.image ? (
          <img src={p?.image} alt="" className="w-full h-full object-cover" />
        ) : (
          <>
            <div className="p-5 flex flex-col text-white">
              <span className="text-[13px]">
                <div className="flex items-center gap-1">
                  <div className="font-bold">{user?.username}</div>
                  <span> · </span>
                  <span className="text-[12px] text-[#a8a8a8]">
                    {p?.status == ""
                      ? formatTimeCreated(p?.createdAt)
                      : p?.status}
                  </span>
                </div>
                <div>{p?.content}</div>
              </span>
              {p?.status && (
                <span className="text-[10px]">
                  {formatTimeCreated(p?.createdAt)}
                </span>
              )}
            </div>
          </>
        )}
        <div className="hidden group-hover:bg-[rgba(0,0,0,0.3)] w-full h-full group-hover:flex absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white text-lg items-center justify-center gap-5">
          <div className="flex items-center gap-2">
            <HeartFilled />
            {p?.likes?.length}
          </div>
          <div className="flex items-center gap-2">
            <MessageFilled />
            {p?.comment?.length}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostProfile;
