function naqdEskiBalans(hisoblar, id) {
  let naqdEskiBal = 0;

  for (let item of hisoblar) {
    naqdEskiBal += Number(item.balansNaqd);
    if (item.hisobot.id === id) {
      break;
    }
  }

  return naqdEskiBal;
}

export default naqdEskiBalans;
