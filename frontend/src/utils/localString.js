const localString = (x, fraction = 2) => {
  return x?.toLocaleString("en-US", {
    maximumFractionDigits: fraction,
    minimumFractionDigits: 2,
  });
};

export default localString;
