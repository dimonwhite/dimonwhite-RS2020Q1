export default class Dropdown {
  constructor(dropdownWrapSelector, openBtnSelector, dropdownSelector) {
    this.dropdownWrap = document.querySelector(dropdownWrapSelector);
    this.openBtnSelector = openBtnSelector;
    this.dropdownSelector = dropdownSelector;
    this.text = this.dropdownWrap.querySelector('.dropdown_text');
  }

  init() {
    this.dropdownWrap.addEventListener('click', (e) => {
      if (e.target.closest(this.openBtnSelector)) {
        this.dropdownWrap.classList.toggle('active');
        return;
      }
      const dropdownBtn = e.target.closest(`${this.dropdownSelector} li`);
      this.clickDropdownBtn(dropdownBtn);
    });
  }

  clickDropdownBtn(btn) {
    if (btn && !btn.classList.contains('active')) {
      this.changeActiveElememnt(btn);
    }
  }

  changeActiveElememnt(btn) {
    this.dropdownWrap.querySelector('li.active').classList.remove('active');
    btn.classList.add('active');
    this.text.textContent = btn.textContent;
    const event = new CustomEvent('languageChange', { detail: btn });
    document.dispatchEvent(event);
    this.dropdownWrap.classList.remove('active');
  }
}
