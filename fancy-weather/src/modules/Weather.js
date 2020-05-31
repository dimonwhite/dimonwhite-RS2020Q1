export default class Weather {
  constructor() {
    this.elements = document.querySelectorAll('[data-weather]');
  }

  changeInfo(info) {
    this.elements.forEach((el) => {
      const elInfo = el.dataset.weather;
      const result = info[elInfo];
      const element = el;
      element.textContent = result;
    });
  }
}
