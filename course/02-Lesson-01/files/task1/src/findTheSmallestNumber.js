const findTheSmallestNumber = (numbers) => new Promise((resolve, reject) => {
  try {
    resolve(Math.min.apply(null, numbers));
  } catch (e) {
    reject(e);
  }
});

export default findTheSmallestNumber;
