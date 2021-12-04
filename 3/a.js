const { readFileSync } = require('fs');

const data = readFileSync('3/data.txt', 'utf-8')
  .split('\n')
  .map(num => num.split('').map(n => Number(n)));

const accumalator = [];

while (accumalator.length < 12) {
  accumalator.push(0);
}

data.forEach(datum =>
  datum.forEach((num, i) => (accumalator[i] = accumalator[i] + num))
);

const binaryGammaRate = accumalator.map(num => (num > 500 ? 1 : 0)).join('');
const binaryEpsilonRate = accumalator.map(num => (num < 501 ? 1 : 0)).join('');

const decimalGammaRate = parseInt(binaryGammaRate, 2);
const decimalEpsilonRate = parseInt(binaryEpsilonRate, 2);

console.log(
  decimalGammaRate,
  decimalEpsilonRate,
  decimalGammaRate * decimalEpsilonRate
);
