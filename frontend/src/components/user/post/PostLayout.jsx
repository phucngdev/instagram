import { EllipsisOutlined } from "@ant-design/icons";
import React from "react";
import { Link } from "react-router-dom";

const PostLayout = ({ author, content, image }) => {
  return (
    <>
      <div className="w-full flex justify-center pb-4 border-b border-[#282828]">
        <div className="w-[470px] flex flex-col">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <div className="w-[42px] h-[42px] cursor-pointer flex items-center justify-center rounded-full bg-gradient-to-br from-[#d301c5] to-[#ffc703]">
                <Link>
                  <img
                    className="w-[38px] h-[38px] border-2 border-black rounded-full object-cover"
                    src={author?.avatar}
                    alt=""
                  />
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <Link className=" flex items-center justify-center ">
                  <span className="text-[13px] font-bold">
                    {author?.username}
                  </span>
                </Link>
                <span>·</span>
                <span className="text-[12px] text-[#a8a8a8]">{content}</span>
              </div>
            </div>
            <EllipsisOutlined className="cursor-pointer p-1 rounded-full hover:bg-[#282828]" />
          </div>
          <div className="h-[468px] flex justify-center mt-3 border border-[#282828]">
            <img
              className="rounded-sm h-full object-cover"
              src={image}
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PostLayout;
