export default class Info {
  constructor() {
    this.elements = document.querySelectorAll('[data-info]');
  }

  changeInfo(info) {
    console.log(info);
    this.elements.forEach((el) => {
      const elInfo = el.dataset.info;
      const result = info[elInfo];
      const element = el;
      element.textContent = result;
    });
  }
}
