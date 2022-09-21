import mongoose from "mongoose";

const coinSchema = mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    symbol: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Coin = mongoose.model("Coin", coinSchema);

export default Coin;
