import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  coinInfo: localStorage.getItem("coinInfo")
    ? JSON.parse(localStorage.getItem("coinInfo"))
    : null,
  loading: false,
  error: "",
};

export const coinData = createAsyncThunk(
  "coin/coinData",
  async (user, thunkApi) => {
    const coinsData = [];

    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };

      const { data: coinsId } = await axios.get("/api/coins/coinsId", config);
      const { data: userCoinsData } = await axios.get(
        "/api/coins/basic",
        config
      );
      const { data: cmcCoinsData } = await axios.post(
        "/api/cmc",
        {
          coinsId,
        },
        config
      );

      for (let i = 0; i < userCoinsData.length; i++) {
        const {
          quote: {
            USD: { price, percent_change_24h },
          },
        } = cmcCoinsData.find(cmcCoin => cmcCoin.id === userCoinsData[i].id);

        const value = +userCoinsData[i].balance * price;

        coinsData.push({
          ...userCoinsData[i],
          price,
          percent_change_24h,
          value,
        });
      }

      localStorage.setItem("coinInfo", JSON.stringify(coinsData));
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
    },
  },
  extraReducers: {
    [coinData.pending]: state => {
      state.loading = true;
    },
    [coinData.fulfilled]: (state, action) => {
      state.loading = false;
      state.coinInfo = action.payload;
    },
    [coinData.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { reset } = coinSlice.actions;

export default coinSlice.reducer;
