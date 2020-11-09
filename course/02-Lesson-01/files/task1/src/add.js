const add = (number1, number2) => {
  try {
    return number1 + number2;
  } catch (e) {
    throw new Error(e);
  }
};

export default add;
