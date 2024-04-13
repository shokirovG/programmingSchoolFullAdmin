function calcClickKirim(kirim, action) {
  const clickPrice = kirim.filter((el) => el.priceType === action);
  const clickPriceTotal = clickPrice.reduce((s, elem) => {
    return s + elem.price;
  }, 0);
  return clickPriceTotal;
}

export default calcClickKirim;
