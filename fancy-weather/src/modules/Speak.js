export default class Speak {
  constructor(app) {
    this.app = app;
    this.MySpeechRecognition = window.SpeechRecognition
      || window.webkitSpeechRecognition || window.mozSpeechRecognition;
    this.btn = document.querySelector('.mic');
    this.recognition = new this.MySpeechRecognition();
    this.start = false;
    this.input = document.querySelector('.search');
  }

  init() {
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.addEventListener('result', (e) => {
      this.resultRecognition(e.results[0]);
    });
    this.btn.addEventListener('click', () => {
      this.clickStartBtn();
    });
    this.recognition.addEventListener('start', () => {
      this.btn.classList.add('active');
    });
    this.recognition.addEventListener('end', () => {
      this.btn.classList.remove('active');
    });
  }

  resultRecognition(result) {
    if (result.isFinal) {
      this.sendCity(result[0].transcript);
    }
  }

  clickStartBtn() {
    if (this.start) {
      this.stopRecognition();
    } else {
      this.startRecognition();
    }
  }

  stopRecognition() {
    this.start = false;
    this.recognition.stop();
  }

  startRecognition() {
    this.start = true;
    this.recognition.lang = this.app.lang === 'en' ? 'en-US' : 'ru-RU';
    this.recognition.start();
  }

  sendCity(city) {
    this.input.value = city;
    this.app.city = city;
    this.app.getInfo();
    this.stopRecognition();
  }
}
