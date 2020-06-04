export default class Popup {
  constructor() {
    this.block = document.querySelector('.popup');
    this.text = this.block.querySelector('.popup_text');
    this.close = this.block.querySelector('.popup_close');
  }

  init() {
    this.close.addEventListener('click', () => {
      this.hidePopup();
    });
  }

  showError(text) {
    this.block.classList.add('error');
    this.showPopup(text);
  }

  showInfo(text) {
    this.block.classList.remove('error');
    this.showPopup(text);
  }

  showPopup(text) {
    this.text.textContent = text;
    this.block.classList.add('active');
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      this.hidePopup();
    }, 5000);
  }

  hidePopup() {
    this.block.classList.remove('active');
  }
}
