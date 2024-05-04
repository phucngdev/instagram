import { createAsyncThunk } from "@reduxjs/toolkit";
import BaseUrl from "../../apis/axios";

export const login = createAsyncThunk("login", async (data) => {
  try {
    const response = await BaseUrl.post("auth/login", data);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    return null;
  }
});

export const register = createAsyncThunk("register", async (data) => {
  try {
    let response = await BaseUrl.post("auth/register", data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const logout = createAsyncThunk("logout", async (data) => {
  try {
    let response = await BaseUrl.post("auth/logout", data);
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const getDataUserLogin = createAsyncThunk("datauserlogin", async () => {
  try {
    const response = await BaseUrl.get(`auth/userlogin`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});
