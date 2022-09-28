CREATE DATABASE wallet;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT
  uuid_generate_v4(),
  name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  is_admin BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE coins (
  id INT NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  symbol VARCHAR(50) NOT NULL UNIQUE,
  logo VARCHAR(255) NOT NULL
);

CREATE TABLE addresses (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  public_address uuid NOT NULL DEFAULT uuid_generate_v4(),
  user_id uuid DEFAULT uuid_generate_v4() NOT NULL REFERENCES users(id),
  coin_symbol VARCHAR(50) NOT NULL REFERENCES coins(symbol),
  balance BIGINT NOT NULL 
);


INSERT INTO coins (id, name, symbol, logo) VALUES (1, 'bitcoin', 'BTC', 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png');

INSERT INTO addresses (user_id, coin_symbol, balance) VALUES ('0b603243-d265-4a45-9970-e338c7b21581', 'BTC', 15);

INSERT INTO addresses (public_address, user_id, coin_symbol, balance) VALUES ('19068676-8db7-4cc3-b4a5-40050a2e17cd', '0b603243-d265-4a45-9970-e338c7b21581', 'BTC', 15);

SELECT * FROM addresses INNER JOIN users ON addresses.user_id = users.id;

SELECT * FROM addresses INNER JOIN coins ON addresses.coin_symbol = coins.symbol;