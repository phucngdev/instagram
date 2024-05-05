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
import PostProfile from "../post/PostProfile";

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
          <PostProfile post={post} />
        </div>
      </div>
    </>
  );
};

export default PostList;
