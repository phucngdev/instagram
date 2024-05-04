import { Input, Select, Switch, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../assets/user/EditAccount.css";
import { bottomLogin } from "./Login";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { updateDataUser } from "../../services/user/account.service";
import { getDataUserLogin } from "../../services/user/auth.service";

const { TextArea } = Input;
const EditProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.data);
  const [bio, setBio] = useState(user?.bio);
  const [username, setUsername] = useState(user?.username);
  const [name, setName] = useState(user?.name);
  const [gender, setGender] = useState(user?.gender);
  const [isShowSugget, setIsShowSugget] = useState(user?.showsugget || false); // chưa có trong db của account, cần thêm sau
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    if (user) {
      setBio(user.bio || "");
      setUsername(user.username || "");
      setName(user.name || "");
      setGender(user.gender || "Male");
      setIsShowSugget(user.showsuggest || false);
    }
  }, [user]);

  // thay đổi giới tính
  const handleChangeGender = (gender) => {
    setGender(gender);
  };

  // thay đổi gợi í ngừoi dùng trong trang cá nhân
  const onChangeSwich = (checked) => {
    setIsShowSugget(checked);
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      const editUser = {
        username: username || "",
        name: name || "",
        bio: bio || "",
        gender: gender,
      };
      setIsSubmit(true);
      await dispatch(updateDataUser({ id: user?._id, editUser: editUser }));
      setIsSubmit(false);
      message.success("Update successfully");
    } catch (error) {
      console.log(error);
      message.error("Update fail");
    }
    await dispatch(getDataUserLogin());
  };

  return (
    <>
      <Helmet>
        <title>Edit profile - Instagram</title>
      </Helmet>
      {user && (
        <form
          onSubmit={handleSubmitEdit}
          className="edit-account-custom flex-1 flex flex-col px-[10%] overflow-y-scroll"
        >
          <h3 className="text-white text-xl font-medium ms-3 mt-10">
            Edit profile
          </h3>
          <div className="flex items-center justify-between bg-[#262626] p-5 rounded-xl text-white mt-10 mb-7">
            <div className="flex items-center gap-4">
              <img
                src={user?.avatar}
                alt=""
                className="size-[56px] rounded-full"
              />
              <div className="flex flex-col">
                <span>{user?.username}</span>
                <span>{user?.name}</span>
              </div>
            </div>
            <button className="px-3 py-2 text-base font-semibold rounded-xl bg-[#0095f6] hover:bg-[#507af7]">
              Change photo
            </button>
          </div>
          <h4 className="text-white font-semibold my-2">Username</h4>
          <Input
            value={username}
            maxLength={20}
            showCount
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="bg-black text-white mt-2 border-[#484848] focus:border-white hover:bg-black focus-within:bg-black placeholder:text-[#a8a8a8]"
          />
          <h4 className="text-white font-semibold mt-8 mb-2">Your name</h4>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="bg-black text-white mt-2 border-[#484848] focus:border-white hover:bg-black focus-within:bg-black placeholder:text-[#a8a8a8]"
          />
          <h4 className="text-white font-semibold mt-8 mb-2">Bio</h4>
          <TextArea
            showCount
            maxLength={150}
            autoSize={{
              minRows: 2,
              maxRows: 6,
            }}
            placeholder="Bio"
            className="mt-2 border-[#484848] bg-black focus-within:bg-black hover:bg-black"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <h4 className="text-white font-semibold mt-8 mb-2">Gender</h4>
          <Select
            defaultValue={gender}
            className="mt-2"
            onChange={handleChangeGender}
            options={[
              {
                value: "Male",
                label: "Male",
              },
              {
                value: "Female",
                label: "Female",
              },
            ]}
          />
          <h4 className="text-white font-semibold mt-8 mb-2">
            Show account suggestions on profiles
          </h4>
          <div className="flex items-center justify-between gap-10 p-4 border border-[#484848] rounded-lg">
            <span className="text-[#a8a8a8] text-sm">
              Choose whether people can see similar account suggestions on your
              profile, and whether your account can be suggested on other
              profiles.
            </span>
            <Switch defaultChecked={isShowSugget} onChange={onChangeSwich} />
          </div>
          <button
            disabled={isSubmit}
            type="submit"
            className="w-[200px] rounded-xl mt-6 px-10 py-3 bg-[#0095f6] text-white text-base font-medium"
          >
            Submit
          </button>
          <div className="flex items-center flex-wrap gap-3 text-[#a8a8a8] justify-center my-10">
            {bottomLogin.map((item, index) => (
              <Link key={index} className="text-sm">
                {item}
              </Link>
            ))}
          </div>
        </form>
      )}
    </>
  );
};

export default EditProfile;
