export default class Dropdown {
  constructor(dropdownWrapSelector, openBtnSelector, dropdownSelector) {
    this.dropdownWrap = document.querySelector(dropdownWrapSelector);
    this.openBtnSelector = openBtnSelector;
    this.dropdownSelector = dropdownSelector;
  }

  init() {
    this.dropdownWrap.addEventListener('click', (e) => {
      if (e.target.closest(this.openBtnSelector)) {
        this.dropdownWrap.classList.toggle('active');
        return;
      }
      if (e.target.closest(`${this.dropdownSelector} li`)) {
        this.dropdownWrap.classList.remove('active');
      }
    });
  }
}
