import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  userInfo: [],
  loading: true,
  error: "",
};

export const login = createAsyncThunk("user/login", async (user, thunkApi) => {
  try {
    const { email, password } = user;
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );

    localStorage.setItem("userInfo", JSON.stringify(data));
    return data;
  } catch (error) {
    thunkApi.rejectWithValue(error);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  // reducers: {
  //   login: state => {
  //     state.loggedIn = true;
  //   },
  // },
  extraReducers: {
    [login.pending]: state => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// export const { login } = userSlice.actions;

export default userSlice.reducer;
