const findTheBiggestNumber = (numbers) => new Promise((resolve, reject) => {
  try {
    resolve(Math.max.apply(null, numbers));
  } catch (e) {
    reject(e);
  }
});

export default findTheBiggestNumber;
