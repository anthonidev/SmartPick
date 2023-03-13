//format coin DOLLAR

const formatCoinDollar = (coin: number) => {
  return coin.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

//format coin EURO

const formatCoinEuro = (coin: number) => {
  return coin.toLocaleString("de-DE", {
    style: "currency",
    currency: "EUR",
  });
};

//format coin PEN

const formatCoinPen = (coin: number) => {
  return coin.toLocaleString("es-PE", {
    style: "currency",
    currency: "PEN",
  });
};

const formatCoin = (coin: number, typeCoin: string) => {
  switch (typeCoin) {
    case "USD":
      return `$ ${formatCoinDollar(coin)}`;
    case "EURO":
      return `€ ${formatCoinEuro(coin)}`;
    case "PEN":
      return `S/. ${formatCoinPen(coin)}`;
    default:
      return formatCoinDollar(coin);
  }
};

export { formatCoin };
