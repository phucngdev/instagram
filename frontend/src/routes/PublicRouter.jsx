import React, { useState } from "react";
import Sidebar from "../layouts/user/Sidebar";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const PublicRouter = () => {
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
