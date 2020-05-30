import ru from '../data/ru.json';
import en from '../data/en.json';
import be from '../data/be.json';

export default class Translate {
  constructor() {
    this.elements = document.querySelectorAll('[data-trs]');
    this.ru = ru;
    this.en = en;
    this.be = be;
    this.lang = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en';
  }

  init() {
    if (this.lang !== 'en') {
      this.changeElements();
    }
    document.addEventListener('languageChange', (e) => {
      this.lang = e.detail.dataset.lang;
      localStorage.setItem('lang', this.lang);
      this.changeElements();
    });
  }

  changeElements() {
    this.elements.forEach((el) => {
      const { trs } = el.dataset;
      const path = trs.split('.');
      let result = this[this.lang];

      path.forEach((piece) => {
        result = result[piece];
      });
      const element = el;
      if (trs === 'searchPlaceholder') {
        element.setAttribute('placeholder', result);
      } else {
        element.textContent = result;
      }
    });
  }
}
