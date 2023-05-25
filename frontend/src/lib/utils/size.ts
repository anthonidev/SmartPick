const BytesToMegabytes = (bytes: number) => {
  const result = bytes / 1048576;
  //redondeamos a 2 decimales
  return Math.round(result * 100) / 100;
};

export { BytesToMegabytes };
