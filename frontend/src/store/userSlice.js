import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  loading: false,
  error: "",
};

export const login = createAsyncThunk("user/login", async (user, thunkApi) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post("/api/users/login", user, config);

    localStorage.setItem("userInfo", JSON.stringify(data));
    return data;
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

      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      return thunkApi.rejectWithValue(err);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: state => {
      localStorage.removeItem("userInfo");
      state.userInfo = null;
    },
  },
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
    [register.pending]: state => {
      state.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { reset } = userSlice.actions;

export default userSlice.reducer;
