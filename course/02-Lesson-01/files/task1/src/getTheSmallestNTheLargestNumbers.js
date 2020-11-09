import findTheBiggestNumber from './findTheBiggestNumber.js';
import findTheSmallestNumber from './findTheSmallestNumber.js';

async function getTheSmallestNTheLargestNumbers(numbers) {
  const responses = await Promise.all([
    findTheSmallestNumber(numbers),
    findTheBiggestNumber(numbers),
  ]);
  return responses;
}

export default getTheSmallestNTheLargestNumbers;
