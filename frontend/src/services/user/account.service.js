import { createAsyncThunk } from "@reduxjs/toolkit";
import BaseUrl from "../../apis/axios";

export const getDataUser = createAsyncThunk("get/user", async (id) => {
  try {
    const response = await BaseUrl.get(`accounts/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const getDataByQuery = createAsyncThunk(
  "get/datauser/search",
  async (query) => {
    try {
      const response = await BaseUrl.get(
        `accounts/search/search?query=${query}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
