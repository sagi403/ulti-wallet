import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: [],
  loggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: state => {
      state.loggedIn = true;
    },
  },
});

export const { login } = userSlice.actions;

export default userSlice.reducer;
