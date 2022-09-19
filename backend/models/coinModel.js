import mongoose from "mongoose";

const coinSchema = mongoose.Schema(
  {
    id: {
      type: Number,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    symbol: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    balance: {
      type: Number,
      require: true,
    },
    value: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Coin = mongoose.model("Coin", coinSchema);

export default Coin;
