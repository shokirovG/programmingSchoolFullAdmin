function clickEskiBalans(hisoblar, id) {
  let clickEskiBal = 0;

  for (let item of hisoblar) {
    clickEskiBal += Number(item.balansClick);
    if (item.hisobot.id === id) {
      break;
    }
  }

  return clickEskiBal;
}

export default clickEskiBalans;
