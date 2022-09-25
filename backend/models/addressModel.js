import mongoose from "mongoose";

const addressSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    coins: [
      {
        userCoin: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Coin",
        },
        balance: {
          type: Number,
          required: true,
        },
      },
    ],
    publicAddress: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Address = mongoose.model("Address", addressSchema);

export default Address;
