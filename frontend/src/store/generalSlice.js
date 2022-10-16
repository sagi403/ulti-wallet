import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { reset as userReset } from "./userSlice";
import { reset as coinReset } from "./coinSlice";

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
  },
});

export default generalSlice.reducer;
