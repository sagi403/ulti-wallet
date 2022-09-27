import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import pool from "./db/index.js";

dotenv.config();

const importData = async () => {
  try {
    await pool.query("DROP TABLE IF EXISTS users");

    await pool.query(`
    CREATE TABLE users (
      user_id uuid PRIMARY KEY DEFAULT
      uuid_generate_v4(),
      name VARCHAR(50) NOT NULL,
      email VARCHAR(50) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      is_admin BOOLEAN NOT NULL DEFAULT false
    );
    `);

    for (let user of users) {
      const { name, email, password, is_admin } = user;

      await pool.query(
        "INSERT INTO users (name, email, password, is_admin) VALUES ($1, $2, $3, $4)",
        [name, email, password, !!is_admin]
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
