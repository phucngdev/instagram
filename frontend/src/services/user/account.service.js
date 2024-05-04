import { createAsyncThunk } from "@reduxjs/toolkit";
import BaseUrl from "../../apis/axios";

// get data user
export const getDataUser = createAsyncThunk("get/user", async (id) => {
  try {
    const response = await BaseUrl.get(`accounts/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

// saerch
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

// edit
export const updateDataUser = createAsyncThunk(
  "patch/editUser",
  async ({ id, editUser }) => {
    try {
      console.log(editUser);
      const response = await BaseUrl.patch(
        `accounts/edit/profile/${id}`,
        editUser
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
