const BytesToMegabytes = (bytes: number, decimal: number = 2) => {
  const result = bytes / 1048576;
  //redondeamos a 2 decimales
  if (decimal === 0) return Math.round(result);
  if (decimal === 1) return Math.round(result * 10) / 10;
  if (decimal === 2) return Math.round(result * 100) / 100;
  if (decimal === 3) return Math.round(result * 1000) / 1000;
  if (decimal === 4) return Math.round(result * 10000) / 10000;
};

export { BytesToMegabytes };
