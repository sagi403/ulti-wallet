import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import coins from "./data/coins.js";
import User from "./models/userModel.js";
import Coin from "./models/coinModel.js";
import Address from "./models/addressModel.js";
import connectDB from "./config/db.js";
import randomCoinAndBalance from "./utils/randomCoinAndBalance.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Coin.deleteMany();
    await Address.deleteMany();

    const createdUsers = await User.insertMany(users);
    const createdCoins = await Coin.insertMany(coins);

    const address = createdUsers.map(user => {
      const coins = [];

      for (let i = 0; i < 5; i++) {
        const { randomCoin, randomBalance } =
          randomCoinAndBalance(createdCoins);

        coins.push({ userCoin: randomCoin, balance: randomBalance });
      }

      return {
        user,
        coins,
      };
    });

    await Address.insertMany(address);

    console.log("Data Imported".green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Coin.deleteMany();
    await Address.deleteMany();

    console.log("Data Destroyed".red.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
