function calcQarzPrice(students, department) {
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
  const tolov = students.filter((el) => el.department == department);

  const tolovTotal = tolov.reduce((s, item) => {
    return s + calcPrice(item.price, item.foiz, item.department);
  }, 0);

  return tolovTotal;
}

export default calcQarzPrice;
