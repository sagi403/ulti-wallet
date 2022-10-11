import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./store/userSlice";
import coinReducer from "./store/coinSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    coin: coinReducer,
  },
});

export default store;
