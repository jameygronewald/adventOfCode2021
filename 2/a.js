const fs = require('fs');

const data = fs.readFileSync('2/data.txt', 'utf-8').split('\n');

const mappedData = data.map(datum => datum.split(' '));

let horizontalMovement = 0;
let depth = 0;

mappedData.forEach(datum => {
  let [direction, amount] = datum;
  amount = Number(amount);
  
  if (direction === 'forward') {
    horizontalMovement += amount;
  } else if (direction === 'down') {
    depth += amount;
  } else {
    depth -= amount;
  }
});

console.log({ horizontalMovement, depth }, horizontalMovement * depth);
