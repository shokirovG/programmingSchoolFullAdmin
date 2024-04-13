function calcPrice(price, foiz, department) {
  let qarz = 0;
  switch (department) {
    case "Dasturlash": {
      qarz = 350000 - foiz - price;
      break;
    }
    case "Scretch": {
      qarz = 200000 - foiz - price;
      break;
    }
    case "K.S": {
      qarz = 240000 - foiz - price;
      break;
    }
    case "Ingliz-tili": {
      qarz = 240000 - foiz - price;
      break;
    }

    default:
      qarz;
  }
  return qarz;
}

export { calcPrice };
