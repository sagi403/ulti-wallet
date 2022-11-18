import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  token: null,
  userInfo: null,
  loading: false,
  loadingLogin: false,
  error: null,
  loggedIn: false,
};

export const login = createAsyncThunk("user/login", async (user, thunkApi) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post("/api/users/login", user, config);

    localStorage.setItem("token", JSON.stringify(data.token));

    return data.token;
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    return thunkApi.rejectWithValue(err);
  }
});

export const register = createAsyncThunk(
  "user/register",
  async (user, thunkApi) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post("/api/users", user, config);

      localStorage.setItem("token", JSON.stringify(data.token));

      return data.token;
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      return thunkApi.rejectWithValue(err);
    }
  }
);

export const autoLogin = createAsyncThunk(
  "user/autoLogin",
  async (data, thunkApi) => {
    try {
      const { data } = await axios.get("/api/users/profile");

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(false);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: state => {
      localStorage.removeItem("userInfo");
      localStorage.removeItem("token");
      state.userInfo = null;
      state.token = null;
      state.loggedIn = false;
    },
    resetError: state => {
      state.error = "";
    },
  },
  extraReducers: {
    [login.pending]: state => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.loggedIn = true;
      state.token = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [register.pending]: state => {
      state.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      state.loggedIn = true;
      state.token = action.payload;
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [autoLogin.pending]: state => {
      state.loadingLogin = true;
    },
    [autoLogin.fulfilled]: (state, action) => {
      state.loadingLogin = false;
      state.userInfo = action.payload;
      state.loggedIn = true;
    },
    [autoLogin.rejected]: (state, action) => {
      state.loadingLogin = false;
      state.error = action.payload;
    },
  },
});

export const { reset, resetError, setUserInfo } = userSlice.actions;

export default userSlice.reducer;
