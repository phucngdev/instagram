import {
  BookOutlined,
  CloseOutlined,
  CommentOutlined,
  EllipsisOutlined,
  HeartFilled,
  HeartOutlined,
  SendOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal, Tooltip } from "antd";
import { newFeed } from "../../../../../services/user/post.service";
import { useDispatch, useSelector } from "react-redux";
import formatTimeCreated from "../../../../../utils/FormatTimeCreated";
import ItemNewFeed from "./itemnewfeed/ItemNewFeed";

const ListNewFeed = () => {
  // tạm thời lấy post của userLogin
  const dispatch = useDispatch();
  const dataPost = useSelector((state) => state.post.data);
  const user = useSelector((state) => state.auth.data);
  const [posts, setPosts] = useState(dataPost?.newfeed || []);

  const getNewFeed = async () => {
    if (user) {
      await dispatch(newFeed(user?._id));
    }
  };

  useEffect(() => {
    getNewFeed();
  }, [user]);

  useEffect(() => {
    if (dataPost) {
      setPosts(dataPost?.newfeed);
    }
  }, [dataPost]);

  return (
    <>
      <div className="w-full flex flex-col items-center mt-[160px]">
        {posts?.map((p) => (
          <ItemNewFeed p={p} />
        ))}
      </div>
    </>
  );
};

export default ListNewFeed;
