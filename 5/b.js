const { readFileSync } = require('fs');

const data = readFileSync('5/data.txt', 'utf-8')
  .split('\n')
  .map((ventLine) =>
    ventLine
      .split(' -> ')
      .map((point) => point.split(',').map((string) => Number(string)))
  );

function getCoords(segment) {
  const [start, finish] = segment;
  const [x1, y1] = start;
  const [x2, y2] = finish;
  return { x1, y1, x2, y2 };
}

const isNotDiagonal = ({ x1, y1, x2, y2 }) => x1 === x2 || y1 === y2;

const getStaticCoord = ({ x1, x2 }) => (x1 === x2 ? 'x' : 'y');

function logPoints(segments) {
  const pointMap = {};
  const pointList = mapSegmentsToListOfPoints(segments);
  for (const point of pointList) {
    pointMap[point]
      ? (pointMap[point].count += 1)
      : (pointMap[point] = { count: 1 });
  }
  return pointMap;
}

function mapSegmentsToListOfPoints(segments) {
  return segments
    .map((segment) => {
      const coords = getCoords(segment);
      const hasStatic = isNotDiagonal(coords);
      return makeListOfCoords(coords, hasStatic);
    })
    .flat();
}

function makeListOfCoords(coords, hasStatic) {
  return hasStatic
    ? makeHorizontalOrVerticalList(coords)
    : makeDiagonalList(coords);
}

function makeHorizontalOrVerticalList(coords) {
  const { x1, y1, x2, y2 } = coords;
  const staticCoord = getStaticCoord(coords);
  const xIsStatic = staticCoord === 'x';
  const staticValue = xIsStatic ? x1 : y1;
  const compareArray = xIsStatic ? [y1, y2] : [x1, x2];
  const list = [];

  for (let i = Math.min(...compareArray); i <= Math.max(...compareArray); i++) {
    list.push([xIsStatic ? staticValue : i, !xIsStatic ? staticValue : i]);
  }

  return list;
}

function makeDiagonalList(coords) {
  const { x1, y1, x2, y2 } = coords;
  const list = [];
  const oneIsLowX = Math.min(...[x1, x2]) === x1;
  const lowX = Math.min(...[x1, x2]);

  for (let i = lowX; i <= Math.max(...[x1, x2]); i++) {
    const [yStart, yEnd] = oneIsLowX ? [y1, y2] : [y2, y1];

    const yCoord = yStart < yEnd ? yStart + (i - lowX) : yStart - (i - lowX);

    list.push([i, yCoord]);
  }

  return list;
}

function countDupes(segments) {
  let dupes = 0;
  const pointMap = logPoints(segments);
  for (const key in pointMap) {
    if (pointMap[key].count > 1) {
      dupes++;
    }
  }
  return dupes;
}

console.log(countDupes(data)); // 16716
