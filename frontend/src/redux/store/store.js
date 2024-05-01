import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../useSlice/authSlice";
import accountSlice from "../useSlice/accountSlice";
import roomSlice from "../useSlice/roomSlice";
import messageSlice from "../useSlice/messageSlice";
import postSlice from "../useSlice/postSlice";
import userLoginSlice from "../useSlice/userLoginSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    account: accountSlice,
    room: roomSlice,
    message: messageSlice,
    post: postSlice,
    userLogin: userLoginSlice,
  },
});
export default store;
