import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { reset as userReset } from "./userSlice";
import { coinCmcData, coinUserData, reset as coinReset } from "./coinSlice";

const initialState = {};

export const logout = createAsyncThunk(
  "general/logout",
  async (_, thunkApi) => {
    try {
      thunkApi.dispatch(userReset());
      thunkApi.dispatch(coinReset());
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const refreshStats = createAsyncThunk(
  "general/refreshStats",
  async (_, thunkApi) => {
    try {
      await thunkApi.dispatch(coinCmcData());
      await thunkApi.dispatch(coinUserData());
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {},
  extraReducers: {
    [logout.pending]: state => {
      state.loading = true;
    },
    [logout.fulfilled]: state => {
      state.loading = false;
    },
    [logout.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [refreshStats.pending]: state => {
      state.loading = true;
    },
    [refreshStats.fulfilled]: state => {
      state.loading = false;
    },
    [refreshStats.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default generalSlice.reducer;
