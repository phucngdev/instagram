import {
  BookOutlined,
  CommentOutlined,
  EllipsisOutlined,
  HeartFilled,
  HeartOutlined,
  SendOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { Input, Modal, Tooltip, message } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import formatTimeCreated from "../../../../../../utils/FormatTimeCreated";
import "../../../../../../assets/user/DetailPost.css";

const DetailPost = ({ openDetailPost, setOpenDetailPost, p }) => {
  const user = useSelector((state) => state.account.data?.result);
  const [newComment, setNewComment] = useState("");
  const [isScaled, setIsScaled] = useState(false);
  const [like, setLike] = useState(false);

  const handleLike = () => {
    setLike(!like);
    setIsScaled(true);
    setTimeout(() => {
      setIsScaled(false);
    }, 200);
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    message.success("ok");
    setNewComment("");
  };

  return (
    <>
      <Modal
        title={<></>}
        centered
        open={openDetailPost}
        onOk={() => setOpenDetailPost(false)}
        onCancel={() => setOpenDetailPost(false)}
        footer={false}
        width={900}
        closeIcon={false}
      >
        <div className="flex">
          {p?.image && (
            <>
              <img
                src={p?.image}
                alt=""
                className="w-[50%] h-full object-cover"
              />
            </>
          )}
          <div className="relative flex flex-col flex-1 ps-6 text-white">
            <div className="flex items-center justify-between pb-2">
              <div className="flex items-center gap-2">
                <div className="w-[38px] h-[38px] cursor-pointer flex items-center justify-center rounded-full bg-gradient-to-br from-[#d301c5] to-[#ffc703]">
                  <Link to={`/${user?.username}`}>
                    <img
                      className="w-[35px] h-[35px] border-2 border-black rounded-full object-cover"
                      src={user?.avatar}
                      alt=""
                    />
                  </Link>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    to={`/${user?.username}`}
                    className=" flex items-center justify-center "
                  >
                    <span className="text-[13px] font-bold">
                      {user?.username}
                    </span>
                  </Link>
                  <span>·</span>
                  <span className="text-[12px] text-[#a8a8a8]">
                    {p?.status == ""
                      ? formatTimeCreated(p?.createdAt)
                      : p?.status}
                  </span>
                </div>
              </div>
              <EllipsisOutlined className="cursor-pointer p-1 rounded-full hover:bg-[#282828]" />
            </div>
            <div className="flex-1 overflow-y-scroll mb-[100px]">
              <div className="flex gap-2">
                <div className="w-[38px] h-[38px] cursor-pointer flex items-center justify-center rounded-full bg-gradient-to-br from-[#d301c5] to-[#ffc703]">
                  <Link to={`/${user?.username}`}>
                    <img
                      className="w-[35px] h-[35px] border-2 border-black rounded-full object-cover"
                      src={user?.avatar}
                      alt=""
                    />
                  </Link>
                </div>
                <div className="flex-1 flex flex-col">
                  <span className="text-[13px]">
                    <Link to={`/${user?.username}`} className="font-bold">
                      {user?.username}
                    </Link>{" "}
                    {p?.content}
                  </span>
                  <span className="text-[10px]">
                    {formatTimeCreated(p?.createdAt)}
                  </span>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-6 pe-6 w-full">
              <div className="text-white flex items-center justify-between my-2">
                <div className="flex items-center gap-3">
                  <Tooltip title="Like">
                    {like ? (
                      <HeartOutlined
                        onClick={handleLike}
                        style={{
                          fontSize: "23px",
                          transition: "transform 0.3s, font-size 0.3s",
                          transform: isScaled ? "scale(1.2)" : "scale(1)",
                        }}
                        className="cursor-pointer hover:text-[#a8a8a8]"
                      />
                    ) : (
                      <HeartFilled
                        onClick={handleLike}
                        style={{
                          fontSize: "23px",
                          transition: "transform 0.3s, font-size 0.3s",
                          transform: isScaled ? "scale(1.2)" : "scale(1)",
                        }}
                        className="cursor-pointer text-[#ff2f40] "
                      />
                    )}
                  </Tooltip>
                  <Tooltip title="Comment">
                    <CommentOutlined
                      style={{ fontSize: "23px" }}
                      className="cursor-pointer hover:text-[#a8a8a8]"
                    />
                  </Tooltip>
                  <Tooltip title="Share Post">
                    <SendOutlined
                      style={{ fontSize: "23px" }}
                      className="cursor-pointer hover:text-[#a8a8a8]"
                    />
                  </Tooltip>
                </div>
                <Tooltip title="Save">
                  <BookOutlined
                    style={{ fontSize: "23px" }}
                    className="cursor-pointer hover:text-[#a8a8a8]"
                  />
                </Tooltip>
              </div>
              <span className="text-sm text-white cursor-pointer font-semibold">
                {p?.likes?.length} likes
              </span>
              <form
                onSubmit={handleSubmitComment}
                className="input-detail-post-custom"
              >
                <Input
                  size="default"
                  placeholder="Add a comment"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="bg-black text-white focus:bg-black focus-within:bg-black hover:bg-black placeholder:text-white"
                  prefix={<SmileOutlined />}
                  suffix={
                    <>
                      <button type="submit">Post</button>
                    </>
                  }
                />
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DetailPost;
