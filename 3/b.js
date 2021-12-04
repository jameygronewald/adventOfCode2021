const { readFileSync } = require('fs');

const data = readFileSync('3/data.txt', 'utf-8')
  .split('\n')
  .map(num => num.split('').map(n => Number(n)));

function getKeepZeroOrOneForOxygen(arrayOfBinary, position) {
  let accumulator = 0;
  const swing = Math.ceil(arrayOfBinary.length / 2);
  arrayOfBinary.forEach(arr => arr[position] && accumulator++);
  return accumulator >= swing ? 1 : 0;
}

function getKeepZeroOrOneForCarbonDioxide(arrayOfBinary, position) {
  let accumulator = 0;
  const swing = Math.floor(arrayOfBinary.length / 2);
  arrayOfBinary.forEach(arr => arr[position] && accumulator++);
  return accumulator >= swing ? 0 : 1;
}

const filterData = (data, position, zeroOrOne) =>
  data.filter(arr => arr[position] === zeroOrOne);

function getFinalNumForOxygen(data, position = 0) {
  if (data.length === 1) {
    return parseInt(data[0].join(''), 2);
  }
  const filtered = filterData(
    data,
    position,
    getKeepZeroOrOneForOxygen(data, position)
  );
  return getFinalNumForOxygen(filtered, position + 1);
}

function getFinalNumForCarbonDioxide(data, position = 0) {
  if (data.length === 1) {
    return parseInt(data[0].join(''), 2);
  }
  const filtered = filterData(
    data,
    position,
    getKeepZeroOrOneForCarbonDioxide(data, position)
  );
  return getFinalNumForCarbonDioxide(filtered, position + 1);
}

const finalNumForOxygen = getFinalNumForOxygen(data);
const finalNumForCarbonDioxide = getFinalNumForCarbonDioxide(data);
console.log(
  { finalNumForOxygen, finalNumForCarbonDioxide },
  finalNumForOxygen * finalNumForCarbonDioxide
); // 793873