const fs = require('fs');

const data = fs
  .readFileSync('1/data.txt', 'utf-8')
  .split('\n')
  // .map(datum => Number(datum));

const increased = data.filter((num, i, arr) => num < arr[i + 1]).length;

console.log(increased);
console.log(data);