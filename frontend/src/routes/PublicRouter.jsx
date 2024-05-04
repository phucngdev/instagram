import React, { useEffect, useState } from "react";
import Sidebar from "../layouts/user/Sidebar";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { getDataUserLogin } from "../services/user/auth.service";

const PublicRouter = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDataUserLogin());
  }, [dispatch]);

  const [isLogin, setIsLogin] = useState(() => {
    const tokenCookies = Cookies.get("token");
    if (tokenCookies) {
      const tokenObject = JSON.parse(tokenCookies);
      return tokenObject;
    }
    return false;
  });
  return (
    <>
      {isLogin ? (
        <>
          <Sidebar />
          <div className="ms-[245px] bg-black">
            <Outlet />
          </div>
        </>
      ) : (
        <Navigate to="/accounts/login" />
      )}
    </>
  );
};

export default PublicRouter;
