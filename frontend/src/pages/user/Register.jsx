import React, { useState } from "react";
import { Button, Input, Spin, message } from "antd";
import phone from "../../../public/phone.png";
import logo from "../../../public/logo_text.png";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { bottomLogin } from "./Login";
import { register } from "../../services/user/auth.service";
import { useDispatch } from "react-redux";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      repassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Tên không được để trống"),
      password: Yup.string().required("Mật khẩu không được để trống"),
      repassword: Yup.string()
        .required("Nhập lại mật khẩu")
        .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp"), // Kiểm tra password và repassword có giống nhau không
    }),
    onSubmit: async (values, { resetForm }) => {
      const newUser = {
        username: values.username,
        password: values.password,
      };
      setIsLoading(true);
      await dispatch(register(newUser));
      resetForm();
      setIsLoading(false);
      message.success({
        content: "Đăng ký thành công. Welcome!",
      });
      navigate("/accounts/login");
    },
  });
  return (
    <>
      {isLoading && (
        <>
          <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
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
                <div className="mb-2">
                  <input
                    type="text"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    className="text-[13px] mt-6 border border-gray-200 w-full h-[38px] px-2"
                    placeholder="Tên đăng nhập"
                  />
                  {formik.touched.username && formik.errors.username ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.username}
                    </div>
                  ) : null}
                </div>
                <div className="mb-2">
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
                <div className="mb-2">
                  <Input.Password
                    type="password"
                    name="repassword"
                    value={formik.values.repassword}
                    onChange={formik.handleChange}
                    className="text-[13px] border border-gray-200 w-full h-[38px] px-2"
                    placeholder="Nhập lại mật khẩu"
                  />
                  {formik.touched.repassword && formik.errors.repassword ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.repassword}
                    </div>
                  ) : null}
                </div>
                <div className="my-3">
                  <Button
                    htmlType="submit"
                    className="w-full flex justify-center items-center py-1 text-white text-[16px] font-medium bg-blue-400 rounded-lg"
                  >
                    Đăng ký
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
              </form>
            </div>
            <div className="flex items-center gap-2 justify-center text-[15px] my-[10px] py-[10px] border border-gray-300">
              Bạn đã có tài khoản?{" "}
              <Link
                to="/accounts/login"
                className="text-blue-500 font-semibold"
              >
                {" "}
                Đăng nhập
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

export default Register;
