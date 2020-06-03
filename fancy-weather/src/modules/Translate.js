import { getResult } from '@/utils';
import ru from '../data/ru.json';
import en from '../data/en.json';
import be from '../data/be.json';

export default class Translate {
  constructor(app) {
    this.app = app;
    this.elements = document.querySelectorAll('[data-trs]');
    this.ru = ru;
    this.en = en;
    this.be = be;
    this.lang = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en';
    this.first = true;
  }

  init() {
    document.addEventListener('languageChange', (e) => {
      this.lang = e.detail.dataset.lang;
      localStorage.setItem('lang', this.lang);
      this.app.lang = this.lang;
      if (this.first) {
        this.first = false;
        this.changeElements();
      } else {
        this.requestInfo();
      }
    });
  }

  requestInfo() {
    Promise.all([
      this.app.requestCityInfo(),
      this.app.requestWeatherInfo(),
    ])
      .then((data) => {
        const info = data[0].results[0];
        // eslint-disable-next-line no-underscore-dangle
        const type = info.components._type;
        this[this.lang].city = info.components.hamlet || info.components[type]
          || info.components.county;
        this[this.lang].country = info.components.country;
        const { current } = data[1];
        this[this.lang].weather = current.weather[0].description;
        this.app.weather.weather = current.weather[0].description;
        this.changeElements();
      });
  }

  changeElements() {
    this.elements.forEach((el) => {
      const { trs } = el.dataset;
      const path = trs.split('.');
      const result = getResult(path, this[this.lang]);

      const element = el;
      if (trs === 'searchPlaceholder') {
        element.setAttribute('placeholder', result);
        return;
      }
      if (result) {
        element.textContent = result;
      }
    });
  }
}
