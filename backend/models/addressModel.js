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
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Coin",
      },
    ],
    publicAddress: {
      type: String,
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
