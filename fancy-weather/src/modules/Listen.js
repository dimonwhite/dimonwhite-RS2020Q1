import { celToFah } from '@/utils';
import ru from '../data/ru.json';
import en from '../data/en.json';

export default class Listen {
  constructor(weather) {
    this.weather = weather;
    this.ru = ru;
    this.en = en;
    this.synth = window.speechSynthesis;
  }

  make(lang, data) {
    const { degreesFormat } = this.weather;
    this.lang = lang === 'en' ? 'en' : 'ru';
    this.speakLang = lang === 'en' ? 'en-US' : 'ru-RU';
    const degrees = degreesFormat === 'fah' ? celToFah(data.degrees) : data.degrees;
    const feelsLike = degreesFormat === 'fah' ? celToFah(data.feelsLike) : data.feelsLike;
    this.text = this[this.lang].speak.speakStart + data.weather
        + degrees + this[this.lang].speak.degrees
        + this[this.lang].speak.feelsLike + feelsLike + this[this.lang].speak.degrees;
    this.play();
  }

  play() {
    const utterThis = new SpeechSynthesisUtterance(this.text);
    utterThis.lang = this.speakLang;
    this.synth.speak(utterThis);
  }
}
