import { celToFah } from '@/utils';
import ru from '../data/ru.json';
import en from '../data/en.json';

export default class Listen {
  constructor(app, weather) {
    this.app = app;
    this.weather = weather;
    this.ru = ru;
    this.en = en;
    this.synth = window.speechSynthesis;
    this.volume = 1;
  }

  make(lang, data) {
    const { degreesFormat } = this.weather;
    this.lang = lang === 'en' ? 'en' : 'ru';
    this.speakLang = lang === 'en' ? 'en-US' : 'ru-RU';
    const degrees = degreesFormat === 'fah' ? celToFah(data.degrees) : data.degrees;
    const feelsLike = degreesFormat === 'fah' ? celToFah(data.feelsLike) : data.feelsLike;
    this.text = this[this.lang].listen.speakStart + data.weather
        + degrees + this[this.lang].listen.degrees
        + this[this.lang].listen.feelsLike + feelsLike + this[this.lang].listen.degrees;
    this.play();
  }

  play() {
    const utterThis = new SpeechSynthesisUtterance(this.text);
    utterThis.volume = this.volume;
    utterThis.lang = this.speakLang;
    this.synth.speak(utterThis);
  }

  changeVolume(value) {
    if (this.volume + value > 1) {
      this.app.popup.showInfo(this[this.app.lang].listen.maxVolume);
    } else if (this.volume + value < 0) {
      this.app.popup.showInfo(this[this.app.lang].listen.minVolume);
    } else {
      this.volume += value;
      this.app.popup.showInfo(`${this[this.app.lang].listen.volume} ${this.volume * 100}%`);
    }
  }
}
