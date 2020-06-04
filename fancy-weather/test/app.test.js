import { fetchJSON } from '@/utils';
import { opencagedata } from '@/constants';
import ImageWeather from '@modules/ImgWeather';

describe('getCityInfo', () => {
  test('should return city info', () => {
    return fetchJSON(`${opencagedata}&q=tver&language=en`).then((data) => {
      expect(data.results[0].components.city).toBe('Tver');
    });
  });
});

test('should return quantity svg', () => {
  const imageWeather = new ImageWeather();
  document.body.innerHTML = imageWeather.generateImg('icon01');
  expect(document.querySelectorAll('svg').length).toBe(1);
  document.body.innerHTML = imageWeather.generateImg('icon09');
  expect(document.querySelectorAll('svg').length).toBe(5);
  document.body.innerHTML = imageWeather.generateImg('icon10');
  expect(document.querySelectorAll('svg').length).toBe(5);
  document.body.innerHTML = imageWeather.generateImg('icon13');
  expect(document.querySelectorAll('svg').length).toBe(4);
});
