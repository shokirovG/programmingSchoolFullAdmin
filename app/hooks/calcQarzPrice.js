function calcQarzPrice(students, department, group = "") {
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
      case "Markaz": {
        qarz = 0;
        break;
      }
      default:
        qarz;
    }
    return qarz;
  }
  const tolov = students.filter((el) => el.department == department);

  const tolovTotal = tolov.reduce((s, item) => {
    if (group !== item.group && item.group !== "Front-12") {
      return s + calcPrice(item.price, item.foiz, item.department);
    } else {
      return s;
    }
  }, 0);
  const tolovTotal_2 = tolov.reduce((s, item) => {
    if (group === item.group) {
      return s + calcPrice(item.price, item.foiz, item.department);
    } else {
      return s;
    }
  }, 0);

  if (group === "Front-12") {
    return tolovTotal_2;
  }
  return tolovTotal;
}

export default calcQarzPrice;
