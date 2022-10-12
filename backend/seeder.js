import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import coins from "./data/coins.js";
import pool from "./db/index.js";
import randomCoinAndBalance from "./utils/randomCoinAndBalance.js";

dotenv.config();

const importData = async () => {
  try {
    await pool.query("DROP TABLE IF EXISTS addresses");
    await pool.query("DROP TABLE IF EXISTS coins");
    await pool.query("DROP TABLE IF EXISTS users");

    // Create tables

    await pool.query(`
    CREATE TABLE users (
      id uuid PRIMARY KEY DEFAULT
      uuid_generate_v4(),
      name VARCHAR(50) NOT NULL,
      email VARCHAR(50) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      is_admin BOOLEAN NOT NULL DEFAULT false
    );
    `);

    await pool.query(`
    CREATE TABLE coins (
      id INT NOT NULL UNIQUE,
      name VARCHAR(100) NOT NULL,
      symbol VARCHAR(50) NOT NULL UNIQUE,
      logo VARCHAR(255) NOT NULL
    );
    `);

    await pool.query(`
    CREATE TABLE addresses (
      id BIGINT GENERATED ALWAYS AS IDENTITY,
      public_address uuid NOT NULL DEFAULT uuid_generate_v4(),
      user_id uuid DEFAULT uuid_generate_v4() NOT NULL REFERENCES users(id),
      coin_id INT NOT NULL REFERENCES coins(id),
      balance BIGINT NOT NULL
    );
    `);

    // Initialize tables

    for (let user of users) {
      const { name, email, password, is_admin } = user;

      await pool.query(
        "INSERT INTO users (name, email, password, is_admin) VALUES ($1, $2, $3, $4)",
        [name, email, password, !!is_admin]
      );
    }

    for (let coin of coins) {
      const { id, name, symbol, logo } = coin;

      await pool.query(
        "INSERT INTO coins (id, name, symbol, logo) VALUES ($1, $2, $3, $4)",
        [id, name, symbol, logo]
      );
    }

    let users_id = await pool.query("SELECT id FROM users;");
    users_id = users_id.rows;

    const addresses = [];

    users_id.map(user => {
      for (let i = 0; i < 5; i++) {
        const { randomCoin, randomBalance } = randomCoinAndBalance(coins);
        const { id: user_id } = user;
        const { id: coin_id } = randomCoin;

        addresses.push({ user_id, coin_id, randomBalance });
      }
    });

    for (let address of addresses) {
      const { user_id, coin_id, randomBalance } = address;

      await pool.query(
        "INSERT INTO addresses (user_id, coin_id, balance) VALUES ($1, $2, $3)",
        [user_id, coin_id, randomBalance]
      );
    }

    console.log("Data Imported".green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await pool.query("DROP TABLE IF EXISTS addresses");
    await pool.query("DROP TABLE IF EXISTS coins");
    await pool.query("DROP TABLE IF EXISTS users");

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
