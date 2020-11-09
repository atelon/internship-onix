const getDigits = (number) => {
  try {
    let inNumber = Math.abs(number);
    const digits = [];
    if (inNumber > 0) {
      while (inNumber > 0) {
        digits.push(inNumber % 10);
        inNumber = parseInt(inNumber / 10, 10);
      }
    } else {
      digits.push(0);
    }
    return digits.reverse();
  } catch (e) {
    throw new Error(e);
  }
};

export default getDigits;
