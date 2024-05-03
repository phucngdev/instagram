import { CloseOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Follow = ({ user }) => {
  const [openFollower, setOpenFollower] = useState(false);
  const [openFollowing, setOpenFollowing] = useState(false);

  return (
    <>
      <div className="flex text-[16px] items-center gap-10 text-white mt-5">
        <h3>{user?.posts?.length || 0} posts</h3>
        <h3 className="cursor-pointer" onClick={() => setOpenFollower(true)}>
          {user?.followers?.length || 0} followers
        </h3>
        <Modal
          title={
            <>
              <h3 className="bg-black text-center text-white">Followers</h3>
            </>
          }
          centered
          open={openFollower}
          onOk={() => setOpenFollower(false)}
          onCancel={() => setOpenFollower(false)}
          footer={false}
          closeIcon={<CloseOutlined className="text-white" />}
        >
          <div className="flex flex-col gap-3 pt-3 border-t border-gray-500">
            {user?.followers?.length > 0 &&
              user?.followers?.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-[42px] h-[42px] cursor-pointer flex items-center justify-center rounded-full bg-gradient-to-br from-[#d301c5] to-[#ffc703]">
                      <Link>
                        <img
                          className="w-[38px] h-[38px] border-2 border-black rounded-full object-cover"
                          src={item?.photoUrl}
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="flex flex-col">
                      <Link className="flex items-center justify-center ">
                        <span className="text-white text-[13px] font-bold">
                          {item?.username}
                        </span>
                      </Link>
                      <span className="text-[#a8a8a8] text-[13px] font-normal">
                        {item?.fullname}
                      </span>
                    </div>
                  </div>
                  <Button
                    type=""
                    className="bg-[#474747] hover:bg-[#404040] text-white"
                  >
                    <span className="font-bold">Remove</span>
                  </Button>
                </div>
              ))}
          </div>
        </Modal>
        <h3 className="cursor-pointer" onClick={() => setOpenFollowing(true)}>
          {user?.following?.length || 0} following
        </h3>
        <Modal
          title={
            <>
              <h3 className="bg-black text-center text-white">Following</h3>
            </>
          }
          centered
          open={openFollowing}
          onOk={() => setOpenFollowing(false)}
          onCancel={() => setOpenFollowing(false)}
          footer={false}
          closeIcon={<CloseOutlined className="text-white" />}
        >
          <div className="flex flex-col gap-3 pt-3 border-t border-gray-500">
            {user?.following?.length > 0 &&
              user?.following?.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-[42px] h-[42px] cursor-pointer flex items-center justify-center rounded-full bg-gradient-to-br from-[#d301c5] to-[#ffc703]">
                      <Link>
                        <img
                          className="w-[38px] h-[38px] border-2 border-black rounded-full object-cover"
                          src={item?.photoUrl}
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="flex flex-col">
                      <Link className="flex items-center justify-center ">
                        <span className="text-white text-[13px] font-bold">
                          {item?.username}
                        </span>
                      </Link>
                      <span className="text-[#a8a8a8] text-[13px] font-normal">
                        {item?.fullname}
                      </span>
                    </div>
                  </div>
                  <Button
                    type=""
                    className="bg-[#474747] hover:bg-[#404040] text-white"
                  >
                    <span className="font-bold">Remove</span>
                  </Button>
                </div>
              ))}
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Follow;
