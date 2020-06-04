import ru from '../data/ru.json';
import en from '../data/en.json';
import be from '../data/be.json';

export default class Speak {
  constructor(app) {
    this.app = app;
    this.MySpeechRecognition = window.SpeechRecognition
      || window.webkitSpeechRecognition || window.mozSpeechRecognition;
    this.btn = document.querySelector('.mic');
    this.recognition = new this.MySpeechRecognition();
    this.start = false;
    this.input = document.querySelector('.search');
    this.ru = ru;
    this.en = en;
    this.be = be;
  }

  init() {
    this.recognition.continuous = true;
    this.recognition.interimResults = false;
    this.recognition.addEventListener('result', (e) => {
      const i = e.resultIndex;
      this.resultRecognition(e.results[i][0].transcript.trim());
    });
    this.btn.addEventListener('click', () => {
      this.clickStartBtn();
    });
    this.recognition.addEventListener('start', () => {
      this.start = true;
      this.btn.classList.add('active');
    });
    this.recognition.addEventListener('end', () => {
      this.start = false;
      this.btn.classList.remove('active');
    });
  }

  resultRecognition(result) {
    if (Speak.isControl(result)) {
      this.controlListen(result);
    } else {
      this.sendCity(result);
    }
  }

  clickStartBtn() {
    if (this.start) {
      this.stopRecognition();
    } else {
      this.startRecognition();
      this.app.popup.showInfo(this[this.app.lang].speakText);
    }
  }

  stopRecognition() {
    this.recognition.stop();
  }

  startRecognition() {
    this.recognition.lang = this.app.lang === 'en' ? 'en-US' : 'ru-RU';
    this.recognition.start();
  }

  sendCity(city) {
    this.input.value = city;
    this.app.city = city;
    this.app.getInfo();
    this.stopRecognition();
  }

  static isControl(command) {
    return command.toLowerCase() === 'play' || command.toLowerCase() === 'прослушать'
        || command.toLowerCase() === 'decrease volume' || command.toLowerCase() === 'уменьшить громкость'
        || command.toLowerCase() === 'increase volume' || command.toLowerCase() === 'увеличить громкость';
  }

  controlListen(command) {
    switch (command.toLowerCase()) {
      case 'play':
      case 'прослушать':
        this.listenWeather();
        break;
      case 'decrease volume':
      case 'уменьшить громкость':
        this.app.listen.changeVolume(-0.1);
        break;
      case 'increase volume':
      case 'увеличить громкость':
        this.app.listen.changeVolume(+0.1);
        break;
      default:
        break;
    }
  }

  listenWeather() {
    this.stopRecognition();
    this.app.listen.make(this.app.lang, this.app.weather);
  }
}
