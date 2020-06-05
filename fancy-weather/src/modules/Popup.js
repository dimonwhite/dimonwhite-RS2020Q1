import ru from '../data/ru.json';
import en from '../data/en.json';
import be from '../data/be.json';

export default class Popup {
  constructor(app) {
    this.app = app;
    this.error = document.querySelector('.popup.error');
    this.info = document.querySelector('.popup.info');
    this.errorText = this.error.querySelector('.popup_text');
    this.closeSelector = '.popup_close';
    this.ru = ru;
    this.en = en;
    this.be = be;
  }

  init() {
    document.addEventListener('click', (e) => {
      const close = e.target.closest(this.closeSelector);
      if (close) {
        Popup.hidePopup(close.parentNode);
      }
    });
  }

  showError(key) {
    this.errorText.textContent = this[this.app.lang][key];
    this.error.classList.add('active');
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      Popup.hidePopup(this.error);
    }, 5000);
  }

  showInfo() {
    this.info.classList.add('active');
  }

  static hidePopup(popup) {
    popup.classList.remove('active');
  }
}
