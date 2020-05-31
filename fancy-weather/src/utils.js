const fetchJSON = (url) => fetch(url)
  .then((response) => response.json());

const getTimesOfDay = (hour) => {
  let timesOfDay;
  switch (true) {
    case (hour >= 0 && hour < 5):
      timesOfDay = 'night';
      break;
    case (hour >= 5 && hour < 12):
      timesOfDay = 'morning';
      break;
    case (hour >= 12 && hour < 18):
      timesOfDay = 'day';
      break;
    case (hour >= 18 && hour < 24):
      timesOfDay = 'evening';
      break;
    default:
      break;
  }
  return timesOfDay;
};

const changeGeometry = (geometry) => {
  const geometryItem = geometry.split('.');
  return `${geometryItem[0]}°${geometryItem[1].slice(0, 2)}'`;
};

const objectAverage = (obj) => {
  const keysArray = Object.keys(obj);
  return keysArray.reduce((sum, key) => sum + obj[key], 0) / keysArray.length;
};

const getNextDay = (day) => (day + 1 <= 6 ? day + 1 : 0);

const celToFah = (degrees) => Math.round(+degrees * (9 / 5) + 32);

const fahToCel = (degrees) => Math.round((+degrees - 32) * (5 / 9));

const getResult = (path, res) => {
  let result = res;
  path.forEach((piece) => {
    result = result[piece];
  });
  return result;
};

export {
  fetchJSON, getTimesOfDay, changeGeometry, objectAverage,
  getNextDay, celToFah, fahToCel, getResult,
};
