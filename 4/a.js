const { readFileSync } = require('fs');

const data = readFileSync('4/data.txt', 'utf-8')
  .split('\n')
  .filter((datum) => datum);

const drawnNums = data[0].split(',');

const generateBingoCards = () => {
  const bingoArray = [];

  for (let i = 5; i < data.length; i += 5) {
    bingoArray.push([
      ...data.slice(i - 4, i + 1).map((row) =>
        row
          .trim()
          .split(' ')
          .filter((el) => !!el)
          .map((el) => ({ value: el, chosen: false }))
      ),
    ]);
  }

  return bingoArray;
};

const bingoCards = generateBingoCards();

let currentNum = 0;
let winner = null;

function drawNumber() {
  const drawn = drawnNums[currentNum];
  markCards(drawn);

  currentNum++;
}

function markCards(drawnNum) {
  for (let i = 0; i < bingoCards.length; i++) {
    const card = bingoCards[i];
    card.forEach((row) =>
      row.forEach((space) => {
        if (space.value === drawnNum) {
          space.chosen = true;
        }
      })
    );
    evalForWinner(card, i);
  }
}

function evalForWinner(card, cardNumber) {
  if (evalRowForWin(card) || evalColForWin(card)) {
    winner = cardNumber;
  }
}

const evalRowForWin = (card) =>
  card.some((row) => row.every((space) => space.chosen));

const evalColForWin = (card) => evalRowForWin(getCols(card));

const getCols = (card) => card.map((row, i) => [...card.map((row) => row[i])]);

function getCardScore(card) {
  const operandOne = Number(drawnNums[currentNum - 1]);
  const operandTwo = sumNotChosen(card);

  return operandOne * operandTwo;
}

function sumNotChosen(card) {
  let sum = 0;
  card.forEach((row) =>
    row.forEach((space) => (sum += !space.chosen ? Number(space.value) : 0))
  );

  return sum;
}

while (!winner) {
  drawNumber();
}

console.log(winner, getCardScore(bingoCards[winner]));
