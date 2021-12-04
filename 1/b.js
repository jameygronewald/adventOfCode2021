const fs = require('fs');

const data = fs
  .readFileSync('1/data.txt', 'utf-8')
  .split('\n')
  .map(datum => Number(datum));

let increased = 0;

for (let i = 3; i < data.length; i++) {
  const sumOne = data[i - 2] + data[i - 1] + data[i];
  const sumTwo = data[i - 3] + data[i - 2] + data[i - 1];

  if (sumOne > sumTwo) {
    increased++;
  }
}

console.log(increased);
