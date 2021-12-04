const fs = require('fs');

const data = fs.readFileSync('2/data.txt', 'utf-8').split('\n');

const mappedData = data.map(datum => datum.split(' '));

let horizontalMovement = 0;
let depth = 0;
let aim = 0;

mappedData.forEach(datum => {
  let [direction, amount] = datum;
  amount = Number(amount);

  if (direction === 'forward') {
    horizontalMovement += amount;
    depth += aim * amount;
  } else if (direction === 'down') {
    aim += amount;
  } else {
    aim -= amount;
  }
});

console.log({ horizontalMovement, depth }, horizontalMovement * depth);
