import { createAsyncThunk } from "@reduxjs/toolkit";
import BaseUrl from "../../apis/axios";

export const login = createAsyncThunk("login", async (data) => {
  try {
    let response = await BaseUrl.post("auth/login", data);
    return response.data;
  } catch (error) {
    console.log(error);
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
