import { getResult } from '@/utils';
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
      const result = getResult(path, this[this.lang]);

      const element = el;
      if (trs === 'searchPlaceholder') {
        element.setAttribute('placeholder', result);
      } else {
        element.textContent = result;
      }
    });
  }
}
