import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  coinInfo: localStorage.getItem("coinInfo")
    ? JSON.parse(localStorage.getItem("coinInfo"))
    : null,
  totalValue: 0,
  userCoinsInfo: null,
  allCoinsInfo: null,
  loading: false,
  error: "",
};

export const coinCmcData = createAsyncThunk(
  "coin/coinCmcData",
  async (data, thunkApi) => {
    try {
      const { data: coinsId } = await axios.get("/api/coins/coinsIdAll");
      const { data: cmcCoinsData } = await axios.post("/api/cmc", {
        coinsId,
      });

      const coinsData = {};

      for (let id in cmcCoinsData) {
        const {
          quote: {
            USD: { price, percent_change_24h },
          },
        } = cmcCoinsData[id];

        coinsData[id] = { price, percent_change_24h };
      }

      localStorage.setItem("coinInfo", JSON.stringify(coinsData));
      return { coinsData };
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      return thunkApi.rejectWithValue(err);
    }
  }
);

export const coinUserData = createAsyncThunk(
  "coin/coinUserData",
  async (data, thunkApi) => {
    try {
      const coinInfo = thunkApi.getState().coin.coinInfo
        ? thunkApi.getState().coin.coinInfo
        : (await thunkApi.dispatch(coinCmcData())).payload.coinsData;

      const coinsData = [];
      let totalValue = 0;

      const { data: userCoinsData } = await axios.get("/api/coins/basic");

      for (let coin of userCoinsData) {
        coin.balance = +coin.balance;
        const value = coin.balance * coinInfo[coin.id].price;

        coinsData.push({ ...coin, ...coinInfo[coin.id], value });

        totalValue += value;
      }

      return { coinsData, totalValue };
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      return thunkApi.rejectWithValue(err);
    }
  }
);

export const coinAllData = createAsyncThunk(
  "coin/coinAllData",
  async (data, thunkApi) => {
    try {
      const coinInfo = thunkApi.getState().coin.coinInfo
        ? thunkApi.getState().coin.coinInfo
        : (await thunkApi.dispatch(coinCmcData())).payload.coinsData;

      const coinsData = [];

      const { data: userCoinsData } = await axios.get("/api/coins/basicAll");

      for (let coin of userCoinsData) {
        const price = coinInfo[coin.id].price;
        coin.balance = +coin.balance;

        coinsData.push({ ...coin, price });
      }

      return coinsData;
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      return thunkApi.rejectWithValue(err);
    }
  }
);

const coinSlice = createSlice({
  name: "coin",
  initialState,
  reducers: {
    reset: state => {
      localStorage.removeItem("coinInfo");
      state.coinInfo = null;
      state.userCoinsInfo = null;
      state.allCoinsInfo = null;
      state.totalValue = 0;
    },
  },
  extraReducers: {
    [coinCmcData.pending]: state => {
      state.loading = true;
    },
    [coinCmcData.fulfilled]: (state, action) => {
      state.loading = false;
      state.coinInfo = action.payload.coinsData;
    },
    [coinCmcData.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [coinUserData.pending]: state => {
      state.loading = true;
    },
    [coinUserData.fulfilled]: (state, action) => {
      state.loading = false;
      state.userCoinsInfo = action.payload.coinsData;
      state.totalValue = action.payload.totalValue;
    },
    [coinUserData.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [coinAllData.pending]: state => {
      state.loading = true;
    },
    [coinAllData.fulfilled]: (state, action) => {
      state.loading = false;
      state.allCoinsInfo = action.payload;
    },
    [coinAllData.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { reset } = coinSlice.actions;

export default coinSlice.reducer;
