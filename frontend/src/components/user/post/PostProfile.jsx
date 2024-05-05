import { HeartFilled, MessageFilled } from "@ant-design/icons";
import React from "react";

const PostProfile = ({ post }) => {
  return (
    <>
      {post?.map((p) => (
        <div
          key={p?._id}
          className="group relative w-[310px] h-[310px] cursor-pointer border rounded-sm"
        >
          {p?.image ? (
            <img src={p?.image} alt="" className="w-full h-full object-cover" />
          ) : (
            <>
              <div className="h-full flex flex-col justify-center items-center text-white">
                <span className="text-sm">Cập nhật trạng thái</span>
                <span className="text-base">{p?.status}</span>
              </div>
            </>
          )}
          <div className="hidden group-hover:bg-[rgba(0,0,0,0.3)] w-full h-full group-hover:flex absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white text-lg items-center justify-center gap-5">
            <div className="flex items-center gap-2">
              <HeartFilled />
              {p?.likes?.length || 0}
            </div>
            <div className="flex items-center gap-2">
              <MessageFilled />
              {p?.comment?.length || 0}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default PostProfile;
