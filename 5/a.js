const { readFileSync } = require('fs');

const data = readFileSync('5/data.txt', 'utf-8')
  .split('\n')
  .map((ventLine) =>
    ventLine
      .split(' -> ')
      .map((point) => point.split(',').map((string) => Number(string)))
  );

const validSegments = data.filter((segment) => {
  const { x1, y1, x2, y2 } = getCoords(segment);
  return !(x1 !== x2 && y1 !== y2);
});

function getCoords(segment) {
  const [start, finish] = segment;
  const [x1, y1] = start;
  const [x2, y2] = finish;
  return { x1, y1, x2, y2 };
}

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
      const staticCoord = getStaticCoord(coords);
      return makeListOfCoords(coords, staticCoord);
    })
    .flat();
}

function makeListOfCoords({ x1, y1, x2, y2 }, staticCoord) {
  const list = [];
  const xIsStatic = staticCoord === 'x';
  const staticValue = xIsStatic ? x1 : y1;
  const compareArray = xIsStatic ? [y1, y2] : [x1, x2];
  for (let i = Math.min(...compareArray); i <= Math.max(...compareArray); i++) {
    list.push([xIsStatic ? staticValue : i, !xIsStatic ? staticValue : i]);
  }
  return list;
}

function getDupes(segments) {
  let dupes = 0;
  const pointMap = logPoints(segments);
  for (const key in pointMap) {
    if (pointMap[key].count > 1) {
      dupes++;
    }
  }
  return dupes;
}

console.log(getDupes(validSegments)); // 5280
