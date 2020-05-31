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

export { fetchJSON, getTimesOfDay, changeGeometry };
