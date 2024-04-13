function calcCategoryPrice(chiqimlar, category, type) {
  let chiqimlarTotal = 0;
  for (let el of chiqimlar) {
    const chiqimlarFilter = el.hisobot.chiqim.filter(
      (i) => i.costType == category && i.tolovType == type
    );

    el.hisobot.chiqim.forEach((a) => {});
    chiqimlarTotal += chiqimlarFilter.reduce((s, item) => {
      return s + Number(item.costValue);
    }, 0);
  }

  return chiqimlarTotal;
}

export default calcCategoryPrice;
