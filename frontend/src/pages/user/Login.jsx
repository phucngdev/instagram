import React, { useState } from "react";
import { Button, Input, Spin, message } from "antd";
import phone from "../../../public/phone.png";
import logo from "../../../public/logo_text.png";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { login } from "../../services/user/auth.service";
import Cookies from "js-cookie";

export const bottomLogin = [
  "Meta",
  "About",
  "Blog",
  "Jobs",
  "Help",
  "API",
  "Privacy",
  "Terms",
  "Locations",
  "Instagram Lite",
  "Threads",
  "Contact Uploading & Non-Users",
  "Meta Verified",
  "@2024 Instagram from Meta",
];

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Tên không được để trống"),
      password: Yup.string().required("Mật khẩu không được để trống"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const userLogin = {
        username: values.username,
        password: values.password,
      };
      setIsLoading(true);
      const response = await dispatch(login(userLogin));
      console.log(response?.payload?.result?.data?.user);
      if (response?.payload?.result?.data?.user) {
        Cookies.set(
          "user",
          JSON.stringify(response?.payload?.result?.data?.user),
          {
            expires: 8 / 24,
          }
        );
        Cookies.set("token", JSON.stringify(response?.payload?.accessToken), {
          expires: 8 / 24,
        });
        message.success("Hello!");
        navigate("/");
        resetForm();
        setIsLoading(false);
      }
    },
  });
  return (
    <>
      {isLoading && (
        <>
          <div className="fixed z-50 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <Spin />
          </div>
        </>
      )}
      <div className="flex flex-col items-center justify-center mt-8">
        <div className="flex items-center gap-8">
          <div className="w-[380px] h-[580px]">
            <img className="w-full h-full object-cover" src={phone} alt="" />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col items-center w-[350px] border border-gray-300 py-[10px]">
              <div className="w-[175px] h-[51px] overflow-hidden bg-center mt-9 mb-3">
                <img className="" src={logo} alt="" />
              </div>
              <form className="w-full px-10" onSubmit={formik.handleSubmit}>
                <div className="mb-[6px]">
                  <input
                    type="text"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    className="text-[13px] mt-6 border border-gray-200 w-full h-[38px] px-2"
                    placeholder="Phone number, username, or email"
                  />
                  {formik.touched.username && formik.errors.username ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.username}
                    </div>
                  ) : null}
                </div>
                <div className=" mb-[6px]">
                  <Input.Password
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    className="text-[13px] border border-gray-200 w-full h-[38px] px-2"
                    placeholder="Mật khẩu"
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.password}
                    </div>
                  ) : null}
                </div>
                <div className="my-3">
                  <Button
                    htmlType="submit"
                    className="w-full flex justify-center items-center py-1 text-white text-[16px] font-medium bg-blue-400 rounded-lg"
                  >
                    Đăng nhập
                  </Button>
                </div>
                <div className="flex items-center">
                  <div className="h-[1px] flex-1 bg-gray-300"></div>
                  <div className="mx-[18px] text-sm font-medium">OR</div>
                  <div className="h-[1px] flex-1 bg-gray-300"></div>
                </div>
                <Button className="w-full flex items-center justify-center gap-2 mt-3">
                  Đăng nhập với Facebook
                </Button>
                <a
                  href=""
                  className="w-full text-[13px] flex items-center justify-center gap-2 mt-3"
                >
                  Quên mật khẩu?
                </a>
              </form>
            </div>
            <div className="flex items-center gap-2 justify-center text-[15px] my-[10px] py-[10px] border border-gray-300">
              Bạn chưa có tài khoản?{" "}
              <Link
                to="/accounts/register"
                className="text-blue-500 font-semibold"
              >
                {" "}
                Đăng ký
              </Link>
            </div>
          </div>
        </div>
        <div className="flex items-center flex-wrap gap-3 max-w-[65%] justify-center">
          {bottomLogin.map((item, index) => (
            <Link
              key={index}
              className="text-sm text-gray-600 hover:border-b hover:border-gray-800"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Login;
