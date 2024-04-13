const numberTrim = (num = 0) => {
  const numToStr = num.toString().split("").reverse().join("");
  let k = "";

  for (let i = 0; i < numToStr.length; i++) {
    if (i > 0 && i % 3 === 0) {
      k += " " + numToStr[i];
    } else {
      k += numToStr[i];
    }
  }
  k = k.split("").reverse().join("");

  return k;
};

export default numberTrim;
