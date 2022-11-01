export const priceFormater = (price: number) => {
  const formatedPrice = price.toLocaleString(`pt-br`, {
    style: `currency`,
    currency: `BRL`,
  });

  return formatedPrice;
};
