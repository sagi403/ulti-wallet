const coinsGeneralData = coinInfo => {
  let bestAsset = coinInfo.reduce((prev, current) => {
    return prev.percent_change_24h < current.percent_change_24h
      ? current
      : prev;
  });
  let worstAsset = coinInfo.reduce((prev, current) => {
    return prev.percent_change_24h < current.percent_change_24h
      ? prev
      : current;
  });

  let totalChange = 0;

  for (let coin of coinInfo) {
    let initialChange = (100 * coin.value) / (100 + coin.percent_change_24h);

    totalChange += initialChange * (coin.percent_change_24h / 100);
  }

  return { totalChange, bestAsset, worstAsset };
};

export default coinsGeneralData;
