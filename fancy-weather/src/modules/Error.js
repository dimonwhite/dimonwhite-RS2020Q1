export default class Error {
  constructor() {
    this.block = document.querySelector('.error');
    this.text = this.block.querySelector('.error_text');
    this.close = this.block.querySelector('.error_close');
  }

  init() {
    this.close.addEventListener('click', () => {
      this.hideError();
    });
  }

  showError(text) {
    this.text.textContent = text;
    this.block.classList.add('active');
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      this.hideError();
    }, 5000);
  }

  hideError() {
    this.block.classList.remove('active');
  }
}
