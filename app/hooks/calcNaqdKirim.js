function calcNaqdKirim(kirim, action) {
  const naqdPrice = kirim.filter((el) => el.priceType === action);
  const naqdPriceTotal = naqdPrice.reduce((s, elem) => {
    return s + Number(elem.price);
  }, 0);
  return naqdPriceTotal;
}

export default calcNaqdKirim;
