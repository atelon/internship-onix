import getNumber from './src/getNumber.js';
import getDigits from './src/getDigits.js';
import getTheSmallestNTheLargestNumbers from './src/getTheSmallestNTheLargestNumbers.js';
import add from './src/add.js';

async function main() {
  const inputNumber = await getNumber();
  const numbers = getDigits(inputNumber);
  const [theSmallestNumber, theLargestNumber] = await getTheSmallestNTheLargestNumbers(numbers);
  return add(theSmallestNumber, theLargestNumber);
}

main().then(
  (resolved) => {
    console.log(`The sum of the largest and smallest digit is ${resolved}`);
  },
  (rejected) => {
    console.error(rejected);
  },
);
