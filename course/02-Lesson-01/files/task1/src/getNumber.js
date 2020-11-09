import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const isNumeric = (x) => parseInt(x, 10).toString() === x.toString();

const getNumber = () => new Promise((resolve, reject) => {
  rl.question('Input number: ', (inputNumber) => {
    try {
      rl.close();
      if (isNumeric(inputNumber)) {
        resolve(parseInt(inputNumber, 10));
      }
      throw new Error('The value is not integer!');
    } catch (e) {
      reject(e);
    }
  });
});

export default getNumber;
