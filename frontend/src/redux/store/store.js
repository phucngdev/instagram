import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../useSlice/authSlice";
import accountSlice from "../useSlice/accountSlice";
import roomSlice from "../useSlice/roomSlice";
import messageSlice from "../useSlice/messageSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    account: accountSlice,
    room: roomSlice,
    message: messageSlice,
  },
});
export default store;
