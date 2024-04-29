import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../useSlice/authSlice";
import accountSlice from "../useSlice/accountSlice";
import roomSlice from "../useSlice/roomSlice";
import messageSlice from "../useSlice/messageSlice";
// import searchSlice from "../useSlice/searchSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    account: accountSlice,
    room: roomSlice,
    message: messageSlice,
    // search: searchSlice,
  },
});
export default store;
