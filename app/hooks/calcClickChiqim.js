function calcClickChiqim(chiqim, action) {
  const clickChiqimPrice = chiqim.filter((el) => el.tolovType === action);
  const clickChiqimPriceTotal = clickChiqimPrice.reduce((s, elem) => {
    return s + Number(elem.costValue);
  }, 0);
  return clickChiqimPriceTotal;
}

export default calcClickChiqim;
