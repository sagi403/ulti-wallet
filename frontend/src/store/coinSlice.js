import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  coinInfo: localStorage.getItem("coinInfo")
    ? JSON.parse(localStorage.getItem("coinInfo"))
    : null,
  totalValue: localStorage.getItem("totalValue")
    ? JSON.parse(localStorage.getItem("totalValue"))
    : 0,
  loading: false,
  error: "",
};

export const coinData = createAsyncThunk(
  "coin/coinData",
  async (data, thunkApi) => {
    const coinsData = [];

    try {
      const { data: coinsId } = await axios.get("/api/coins/coinsId");
      const { data: userCoinsData } = await axios.get("/api/coins/basic");
      const { data: cmcCoinsData } = await axios.post("/api/cmc", {
        coinsId,
      });

      let totalValue = 0;

      for (let i = 0; i < userCoinsData.length; i++) {
        const {
          quote: {
            USD: { price, percent_change_24h },
          },
        } = cmcCoinsData[userCoinsData[i].id];

        const value = +userCoinsData[i].balance * price;

        coinsData.push({
          ...userCoinsData[i],
          price,
          percent_change_24h,
          value,
        });

        totalValue += value;
      }

      localStorage.setItem("coinInfo", JSON.stringify(coinsData));
      localStorage.setItem("totalValue", JSON.stringify(totalValue));
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

const coinSlice = createSlice({
  name: "coin",
  initialState,
  reducers: {
    reset: state => {
      localStorage.removeItem("coinInfo");
      localStorage.removeItem("totalValue");
      state.coinInfo = null;
      state.totalValue = 0;
    },
  },
  extraReducers: {
    [coinData.pending]: state => {
      state.loading = true;
    },
    [coinData.fulfilled]: (state, action) => {
      state.loading = false;
      state.coinInfo = action.payload.coinsData;
      state.totalValue = action.payload.totalValue;
    },
    [coinData.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { reset } = coinSlice.actions;

export default coinSlice.reducer;

// const { data: coinsId } = await axios.get("/api/coins/coinsId");
//       const { data: userCoinsData } = await axios.get("/api/coins/basic");
//       const { data: cmcCoinsData } = await axios.post("/api/cmc", {
//         coinsId,
//       });

//       let totalValue = 0;

//       for (let i = 0; i < userCoinsData.length; i++) {
//         const {
//           quote: {
//             USD: { price, percent_change_24h },
//           },
//         } = cmcCoinsData[userCoinsData[i].id];

//         const value = +userCoinsData[i].balance * price;

//         coinsData.push({
//           ...userCoinsData[i],
//           price,
//           percent_change_24h,
//           value,
//         });

//         totalValue += value;
//       }
