const randomCoinAndBalance = coins => {
  const randomCoinNumber = Math.floor(Math.random() * coins.length);
  const randomCoin = coins[randomCoinNumber];
  const randomBalance = Math.ceil(Math.random() * 100);
  return { randomCoin, randomBalance };
};

export default randomCoinAndBalance;
