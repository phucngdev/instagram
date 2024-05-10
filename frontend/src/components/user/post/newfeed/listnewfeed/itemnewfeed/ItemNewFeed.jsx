import React, { useState } from "react";
import { Link } from "react-router-dom";
import formatTimeCreated from "../../../../../../utils/FormatTimeCreated";
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
import { Modal, Tooltip } from "antd";
import { Button } from "antd";

const ItemNewFeed = ({ p }) => {
  const [open, setOpen] = useState(false);
  const [like, setLike] = useState(false);
  const [openLikes, setOpenLikes] = useState(false);
  const [isScaled, setIsScaled] = useState(false);
  const handleLike = () => {
    setLike(!like);
    setIsScaled(true);
    setTimeout(() => {
      setIsScaled(false);
    }, 200);
  };
  return (
    <>
      <div key={p?._id} className="w-[470px] flex flex-col pb-10 mb-10">
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <div className="w-[42px] h-[42px] cursor-pointer flex items-center justify-center rounded-full bg-gradient-to-br from-[#d301c5] to-[#ffc703]">
              <Link to={`/${p?.author?.username}`}>
                <img
                  className="w-[38px] h-[38px] border-2 border-black rounded-full object-cover"
                  src={p?.author?.avatar}
                  alt=""
                />
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Link
                to={`/${p?.author?.username}`}
                className=" flex items-center justify-center "
              >
                <span className="text-[13px] font-bold">
                  {p?.author?.username}
                </span>
              </Link>
              <span>·</span>
              <span className="text-[12px] text-[#a8a8a8]">
                {p?.status == "" ? formatTimeCreated(p?.createdAt) : p?.status}
              </span>
            </div>
          </div>
          <EllipsisOutlined className="cursor-pointer p-1 rounded-full hover:bg-[#282828]" />
        </div>
        {p?.image && (
          <div className="h-[468px] flex justify-center mt-3 border border-[#282828]">
            <img
              loading="loading"
              className="rounded-sm h-full object-cover"
              src={p?.image}
              alt=""
            />
          </div>
        )}
        <div className="text-white flex items-center justify-between my-4">
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
                onClick={() => setOpen(true)}
                style={{ fontSize: "23px" }}
                className="cursor-pointer hover:text-[#a8a8a8]"
              />
            </Tooltip>
            <Modal
              title="Modal 1000px width"
              centered
              open={open}
              onOk={() => setOpen(false)}
              onCancel={() => setOpen(false)}
              width={1000}
              footer={false}
            >
              <p>some contents...</p>
              <p>some contents...</p>
              <p>some contents...</p>
            </Modal>
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
        <span
          onClick={() => setOpenLikes(true)}
          className="text-sm text-white cursor-pointer font-semibold"
        >
          {p?.likes?.length} likes
        </span>
        <Modal
          title={
            <>
              <h3 className="bg-[#262626] text-center text-white">Likes</h3>
            </>
          }
          centered
          open={openLikes}
          onOk={() => setOpenLikes(false)}
          onCancel={() => setOpenLikes(false)}
          footer={false}
          closeIcon={<CloseOutlined className="text-white" />}
        >
          <div className="flex flex-col gap-3 pt-3 border-t border-gray-500">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-[42px] h-[42px] cursor-pointer flex items-center justify-center rounded-full bg-gradient-to-br from-[#d301c5] to-[#ffc703]">
                  <Link>
                    <img
                      className="w-[38px] h-[38px] border-2 border-black rounded-full object-cover"
                      src="https://images.pexels.com/photos/17604370/pexels-photo-17604370/free-photo-of-phong-c-nh-dan-ba-ng-i-d-ng-c.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="flex flex-col">
                  <Link className="flex items-center justify-center ">
                    <span className="text-white text-[13px] font-bold">
                      ANvbsbf
                    </span>
                  </Link>
                  <span className="text-[#a8a8a8] text-[13px] font-normal">
                    ANvbsbf
                  </span>
                </div>
              </div>
              <Button type="primary" className="bg-blue-500">
                <span className="font-bold">Follow</span>
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-[42px] h-[42px] cursor-pointer flex items-center justify-center rounded-full bg-gradient-to-br from-[#d301c5] to-[#ffc703]">
                  <Link>
                    <img
                      className="w-[38px] h-[38px] border-2 border-black rounded-full object-cover"
                      src="https://images.pexels.com/photos/17604370/pexels-photo-17604370/free-photo-of-phong-c-nh-dan-ba-ng-i-d-ng-c.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="flex flex-col">
                  <Link className="flex items-center justify-center ">
                    <span className="text-white text-[13px] font-bold">
                      ANvbsbf
                    </span>
                  </Link>
                  <span className="text-[#a8a8a8] text-[13px] font-normal">
                    ANvbsbf
                  </span>
                </div>
              </div>
              <Button type="primary" className="bg-blue-500">
                <span className="font-bold">Follow</span>
              </Button>
            </div>
          </div>
        </Modal>
        <div className="mt-1">
          <span className="text-sm text-[#f5f5f5] font-normal">
            <Link className="font-bold text-white me-2">
              {p?.author?.username}
            </Link>
            {p?.content}
          </span>
        </div>
        <div className="flex items-center mt-1 pb-10 border-b border-[#282828]">
          <input
            type="text"
            className="addcomment flex-1 bg-transparent text-white text-sm focus:outline-none"
            placeholder="Add a comment…"
          />
          <SmileOutlined
            style={{ fontSize: "15px" }}
            className="cursor-pointer text-[#a8a8a8]"
          />
        </div>
      </div>
    </>
  );
};

export default ItemNewFeed;
