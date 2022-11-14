import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  coinInfo: localStorage.getItem("coinInfo")
    ? JSON.parse(localStorage.getItem("coinInfo"))
    : null,
  totalValue: 0,
  userCoinsInfo: null,
  allCoinsInfo: null,
  allCoinsId: null,
  loading: false,
  loadingCoinsId: false,
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
      let totalValue = 0;

      const { data: userCoinsData } = await axios.get("/api/coins/basicAll");

      for (let coin of userCoinsData) {
        coin.balance = +coin.balance;
        const price = coinInfo[coin.id].price;

        const value = coin.balance ? coin.balance * price : 0;
        totalValue += value;

        coinsData.push({ ...coin, price });
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

export const coinsId = createAsyncThunk(
  "coin/coinsId",
  async (data, thunkApi) => {
    try {
      const { data: coinsId } = await axios.get("/api/coins/coinsIdAll");

      return coinsId;
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
    resetError: state => {
      state.error = "";
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
      state.allCoinsInfo = action.payload.coinsData;
      state.totalValue = action.payload.totalValue;
    },
    [coinAllData.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [coinsId.pending]: state => {
      state.loadingCoinsId = true;
    },
    [coinsId.fulfilled]: (state, action) => {
      state.loadingCoinsId = false;
      state.allCoinsId = action.payload;
    },
    [coinsId.rejected]: (state, action) => {
      state.loadingCoinsId = false;
      state.error = action.payload;
    },
  },
});

export const { reset, resetError } = coinSlice.actions;

export default coinSlice.reducer;
