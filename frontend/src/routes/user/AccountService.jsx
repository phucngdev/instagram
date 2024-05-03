import React from "react";
import { Outlet } from "react-router-dom";
import NavAccountService from "../../layouts/user/NavAccountService";

const AccountService = () => {
  return (
    <>
      <div className="flex w-full h-[100vh]">
        <NavAccountService />
        <Outlet />
      </div>
    </>
  );
};

export default AccountService;
