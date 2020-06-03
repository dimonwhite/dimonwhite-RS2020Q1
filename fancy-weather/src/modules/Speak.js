import ru from '../data/ru.json';
import en from '../data/en.json';

export default class Speak {
  constructor() {
    this.ru = ru;
    this.en = en;
    this.synth = window.speechSynthesis;
  }

  make(lang, data) {
    this.lang = lang === 'en' ? 'en' : 'ru';
    this.speakLang = lang === 'en' ? 'en-US' : 'ru-RU';
    this.text = this[this.lang].speak.speakStart + data.weather
        + data.degrees + this[this.lang].speak.degrees
        + this[this.lang].speak.feelsLike + data.feelsLike + this[this.lang].speak.degrees;
    this.play();
  }

  play() {
    const utterThis = new SpeechSynthesisUtterance(this.text);
    utterThis.lang = this.speakLang;
    this.synth.speak(utterThis);
  }
}
