import {
  CheckCircleTwoTone,
  DownOutlined,
  EnvironmentOutlined,
  InstagramOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { Input, Modal, Select, message } from "antd";
import React, { useState } from "react";
import "../../../assets/user/ModalCreate.css";
import { upload } from "../../../utils/uploadImage";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../../services/user/post.service";

const { TextArea } = Input;
const ModalCreate = ({ openCreate, setOpenCreate }) => {
  const user = useSelector((state) => state.auth.data);
  const dispatch = useDispatch();
  const [urlPhotoNew, setUrlPhotoNew] = useState("");
  const [caption, setCaption] = useState("");
  const [status, setStatus] = useState("");

  const handleChangeImage = async (e) => {
    const photoUrl = await upload(e.target, "posts");
    setUrlPhotoNew(photoUrl);
  };

  const handleShare = async () => {
    if (!urlPhotoNew && !caption && !status) {
      message.error("Vui lòng cung cấp nội dung bài viết");
      return;
    }
    const newPost = {
      userId: user?._id,
      image: urlPhotoNew,
      content: caption,
      status: status,
    };
    await dispatch(createPost(newPost));
    setOpenCreate(false);
    setCaption("");
    setStatus("Trạng thái");
    setUrlPhotoNew("");
    message.success({
      content: "Đăng bài thành công",
      icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
    });
  };

  const handleChangeStatus = (value) => {
    setStatus(value);
  };

  return (
    <>
      <Modal
        title={
          <>
            <div className="bg-black flex items-center justify-between">
              <h3 className="text-transparent">Share</h3>
              <h3 className="text-white">Create new post</h3>
              <button
                onClick={handleShare}
                className="text-[#0095f6] hover:text-white"
              >
                Share
              </button>
            </div>
          </>
        }
        centered
        open={openCreate}
        onOk={() => setOpenCreate(false)}
        onCancel={() => setOpenCreate(false)}
        footer={false}
        width={900}
        closeIcon={false}
      >
        <div className="flex pt-3 border-t h-[450px] border-gray-500">
          <div className="flex flex-col gap-3 justify-center items-center w-[65%] h-full ">
            {urlPhotoNew === "" ? (
              <>
                <InstagramOutlined
                  style={{ fontSize: "60px", color: "#fff" }}
                />
                <span className="text-white text-lg">
                  Drag photos & videos here
                </span>
                <label
                  htmlFor="photoNewPost"
                  className="px-3 py-2 rounded-xl bg-[#0095f6]  hover:bg-blue-400"
                >
                  <span className="text-white font-medium cursor-pointer">
                    Select from computer
                  </span>
                </label>
                <input
                  type="file"
                  id="photoNewPost"
                  onChange={handleChangeImage}
                  hidden
                />
              </>
            ) : (
              <>
                <img className="h-full object-cover" src={urlPhotoNew} alt="" />
              </>
            )}
          </div>
          <div className="modal-create-post-custom flex-1 flex flex-col ps-4 border-s border-gray-500">
            <div className="flex items-center gap-3">
              <img
                className="w-[30px] h-[30px] rounded-full object-cover"
                src={user?.avatar}
                alt=""
              />
              <span className="text-white font-semibold">{user?.username}</span>
            </div>
            <TextArea
              showCount
              maxLength={2200}
              placeholder="Write a caption"
              className="mt-4 h-[120px] resize-none text-white bg-black focus-within:bg-black hover:bg-black border-[#484848]"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
            <SmileOutlined className="mt-1 text-white text-xl cursor-pointer" />
            <Select
              defaultValue="Trạng thái"
              className="w-full mt-2"
              onChange={handleChangeStatus}
              options={[
                {
                  value: "Trạng thái",
                  label: "Trạng thái",
                },
                {
                  value: "Đang cảm thấy vui vẻ",
                  label: "Đang cảm thấy vui vẻ",
                },
                {
                  value: "Đang cảm thấy buồn",
                  label: "Đang cảm thấy buồn",
                },
                {
                  value: "Đang cảm thấy tức giận",
                  label: "Đang cảm thấy tức giận",
                },
              ]}
            />
            <div className="mt-3 flex items-center justify-between">
              <input
                className="bg-transparent text-white"
                type="text"
                placeholder="Add a location"
              />
              <EnvironmentOutlined className="text-white text-xl" />
            </div>
            <div className="mt-3 flex items-center justify-between cursor-pointer">
              <span className="text-white">Accessibility</span>
              <DownOutlined className="text-white text-xl" />
            </div>
            <div className="mt-3 flex items-center justify-between cursor-pointer">
              <span className="text-white">Advanced settings</span>
              <DownOutlined className="text-white text-xl" />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalCreate;
