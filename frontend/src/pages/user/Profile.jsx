import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  CloseOutlined,
  EllipsisOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Image, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getDataUser } from "../../services/user/account.service";
import Cookies from "js-cookie";
import UploadImage from "../../utils/UploadImage";
import { createRoomSingle } from "../../services/user/room.service";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dataUser = useSelector((state) => state.account.data);
  const { id } = useParams();

  const [userLogin, setUserLogin] = useState(() => {
    const tokenObject = JSON.parse(Cookies.get("user"));
    return tokenObject;
  });

  const [openPhoto, setOpenPhoto] = useState(false);
  const [imageUpload, setImageUpload] = useState("");

  const loadApiUser = async () => {
    dispatch(getDataUser(id));
  };

  useEffect(() => {
    loadApiUser();
  }, []);

  const handleOpenAvatar = () => {
    if (userLogin?.username === dataUser?.result?.username) {
      setOpenPhoto(true);
    }
  };

  const handleChat = async () => {
    const firstInbox = {
      id: userLogin?._id,
      senderId: userLogin?._id,
      receiverId: dataUser?.result?._id,
    };
    const newRoom = await dispatch(createRoomSingle(firstInbox));
    console.log(newRoom);
    navigate(`/message/${newRoom?.payload?.room?._id}/${userLogin?._id}`);
  };

  return (
    <>
      <Helmet>
        <title>
          {dataUser?.result?.username ||
            dataUser?.result?.phone ||
            userLogin?.username ||
            userLogin?.phone}
        </title>
      </Helmet>
      <div className="max-w-[935px] mx-auto px-5 pt-5">
        <header className="h-[150px] w-full mb-[44px] flex items-center">
          <div className="w-[290px] h-full flex items-center justify-center">
            <Image
              width={150}
              height={150}
              onClick={handleOpenAvatar}
              preview={
                userLogin?.phone === dataUser?.result?.phone ? false : true
              }
              className="bg-gray-500 w-[150px] h-[150px] cursor-pointer rounded-full object-cover"
              src={
                userLogin?.phone === dataUser?.result?.phone
                  ? userLogin?.avatar
                  : dataUser?.result?.avatar
              }
              fallback="data:image/png;base64,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"
            />
            <Modal
              className="shadow-md shadow-stone-600 border border-stone-600 rounded-md"
              title={
                <>
                  <h3 className="bg-black text-center text-white">
                    Change Profile Photo
                  </h3>
                </>
              }
              centered
              open={openPhoto}
              onOk={() => setOpenPhoto(false)}
              onCancel={() => setOpenPhoto(false)}
              footer={false}
              closeIcon={<CloseOutlined className="text-white" />}
            >
              <div className="flex flex-col gap-3 pt-3 border-t border-gray-500">
                <div className="flex items-center justify-center">
                  <UploadImage setImageUpload={setImageUpload} />
                </div>
                <div className="flex items-center justify-center border-t border-gray-500 text-base font-bold text-red-400">
                  <button className="w-full text-center py-2 px-3 cursor-pointer">
                    Remove Photo
                  </button>
                </div>
                <div className="flex items-center justify-center border-t border-gray-500 text-base font-bold text-gray-400">
                  <button
                    onClick={() => setOpenPhoto(false)}
                    className="w-full text-center py-2 px-3 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Modal>
          </div>
          <div className="flex flex-col flex-1">
            <div className="flex items-center gap-7">
              <h3 className="text-[20px] text-white font-normal">
                {dataUser?.result?.username || dataUser?.result?.phone}
              </h3>
              {userLogin?.phone === dataUser?.result?.phone ? (
                <div className="flex flex-1 items-center gap-3">
                  <Button
                    type="default"
                    className="bg-transparent text-white font-semibold"
                  >
                    Edit profile
                  </Button>
                  <Button className="bg-[#363636] text-white font-semibold">
                    View archive
                  </Button>
                  <SettingOutlined
                    style={{ fontSize: "25px" }}
                    className="text-white"
                  />
                </div>
              ) : (
                <div className="flex flex-1 items-center gap-3">
                  <Button
                    type="default"
                    className="bg-blue-500 border-blue-600 text-white font-semibold"
                  >
                    Follow
                  </Button>
                  <Button
                    className="bg-[#363636] text-white font-semibold"
                    onClick={() => handleChat()}
                  >
                    Message
                  </Button>
                  <EllipsisOutlined
                    style={{ fontSize: "25px" }}
                    className="text-white"
                  />
                </div>
              )}
            </div>
            {/* <Follower user={user}></Follower> */}
            <span className="text-white mt-3">{dataUser?.result?.name}</span>
          </div>
        </header>
      </div>
    </>
  );
};

export default Profile;
