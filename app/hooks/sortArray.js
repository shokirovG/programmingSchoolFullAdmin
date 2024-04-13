function sortArray(arr) {
  const arrKun = arr.map((el) => +el.kun);

  const arrKunSort = arrKun.sort(function (a, b) {
    return a - b;
  });
  const newArr = arrKunSort.map((el) => {
    for (let item of arr) {
      if (item.kun == el) {
        return item;
      }
    }
  });
  return newArr;
}

export default sortArray;
