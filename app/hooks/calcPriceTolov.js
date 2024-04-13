function calcPriceTolov(students, department, group = "", a) {
  const tolov = students.filter((el) => el.department === department);
  let tolovTotal = 0;
  for (let item of tolov) {
    if (group != item.group) {
      tolovTotal += Number(item.price);
    }
  }

  const tolovTotal_2 = tolov.reduce((s, item) => {
    if (group == item.group || a === "Front-12") {
      return s + Number(item.price);
    } else {
      return s;
    }
  }, 0);

  if (group === "Front-12") {
    return tolovTotal_2;
  }
  if (group === "G`iyos") {
    return tolov - tolovTotal_2;
  }
  return tolovTotal;
}

export default calcPriceTolov;
