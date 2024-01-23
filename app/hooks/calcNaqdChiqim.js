function calcNaqdChiqim(chiqim, action) {
  const naqdChiqimPrice = chiqim.filter((el) => el.tolovType === action);
  const naqdChiqimPriceTotal = naqdChiqimPrice.reduce((s, elem) => {
    return s + Number(elem.costValue);
  }, 0);
  return naqdChiqimPriceTotal;
}

export default calcNaqdChiqim;
