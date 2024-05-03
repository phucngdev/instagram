import {
  AppstoreOutlined,
  BookOutlined,
  HeartFilled,
  InsertRowAboveOutlined,
  MessageFilled,
  TagOutlined,
} from "@ant-design/icons";
import React from "react";
import { Link } from "react-router-dom";

const PostList = ({ post }) => {
  return (
    <>
      <div className="flex flex-col items-center">
        <nav className="flex items-center justify-center gap-[60px] text-white text-sm">
          <div className="flex items-center gap-1 border-t-2 border-white py-1">
            <InsertRowAboveOutlined />
            POSTS
          </div>
          <Link className="flex items-center gap-1">
            <BookOutlined />
            SAVED
          </Link>
          <Link className="flex items-center gap-1">
            <TagOutlined />
            TAGGED
          </Link>
        </nav>
        <div className="grid grid-cols-3 gap-1 mt-10">
          {post?.map((p) => (
            <div className="group relative w-[310px] h-[310px] cursor-pointer border rounded-sm">
              {p?.image ? (
                <img
                  src={p?.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
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
        </div>
      </div>
    </>
  );
};

export default PostList;
