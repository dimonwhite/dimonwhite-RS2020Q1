import ru from '../data/ru.json';
import en from '../data/en.json';
import be from '../data/be.json';

const months = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
];

const days = [
  'mon',
  'tue',
  'wed',
  'thu',
  'fri',
  'sat',
  'sun',
];

export default class DateAndTime {
  constructor() {
    this.dateBlock = document.querySelector('.weather_date');
    this.hoursEl = this.dateBlock.querySelector('.hours');
    this.minEl = this.dateBlock.querySelector('.minutes');
    this.dayWeekEl = this.dateBlock.querySelector('.dayWeek');
    this.dayMonthEl = this.dateBlock.querySelector('.dayMonth');
    this.monthEl = this.dateBlock.querySelector('.month');
    this.date = new Date();
    this.ru = ru;
    this.en = en;
    this.be = be;
  }

  init(lang) {
    this.lang = lang;
    this.setDate();
    this.initTimer();
    document.addEventListener('languageChange', (e) => {
      this.lang = e.detail.dataset.lang;
    });
  }

  setDate() {
    this.hours = this.date.getHours();
    this.minutes = this.date.getMinutes();
    this.seconds = this.date.getSeconds();
    this.dayWeekEl.textContent = this[this.lang].short[days[this.date.getDay()]];
    this.dayWeekEl.dataset.trs = `short.${days[this.date.getDay()]}`;
    this.monthEl.textContent = this[this.lang].months[months[this.date.getMonth()]];
    this.monthEl.dataset.trs = `months.${months[this.date.getMonth()]}`;
    this.dayMonthEl.textContent = this.date.getDate();
    this.hoursEl.textContent = this.hours;
    this.minEl.textContent = this.minutes > 9 ? this.minutes : `0${this.minutes}`;
  }

  initTimer() {
    setInterval(() => {
      this.seconds += 1;
      if (this.seconds >= 60) {
        this.changeMinutes();
      }
    }, 1000);
  }

  changeMinutes() {
    this.seconds = 0;
    this.minutes += 1;
    if (this.minutes >= 60) {
      this.changeHours();
      this.minutes = 0;
    }
    this.minEl.textContent = this.minutes > 9 ? this.minutes : `0${this.minutes}`;
  }

  changeHours() {
    this.hours += 1;
    if (this.hours >= 24) {
      this.date = new Date();
      this.setDate();
    } else {
      this.hoursEl.textContent = this.hours;
    }
  }
}