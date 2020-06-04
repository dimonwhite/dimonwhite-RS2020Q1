import { getNextDay } from '@/utils';
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
  'sun',
  'mon',
  'tue',
  'wed',
  'thu',
  'fri',
  'sat',
];

export default class DateAndTime {
  constructor() {
    this.dateBlock = document.querySelector('.weather_date');
    this.hoursEl = this.dateBlock.querySelector('.hours');
    this.minEl = this.dateBlock.querySelector('.minutes');
    this.secEl = this.dateBlock.querySelector('.seconds');
    this.dayWeekEl = this.dateBlock.querySelector('.dayWeek');
    this.dayMonthEl = this.dateBlock.querySelector('.dayMonth');
    this.monthEl = this.dateBlock.querySelector('.month');
    this.ru = ru;
    this.en = en;
    this.be = be;
    this.nextDays = {
      one: document.querySelector('.one_day'),
      two: document.querySelector('.two_day'),
      three: document.querySelector('.three_day'),
    };
  }

  init(lang, timezone) {
    this.date = new Date(new Date().toLocaleString('en-US', { timeZone: 'UTC' }));
    this.lang = lang;
    this.setDate(timezone);
    this.initTimer();
    document.addEventListener('languageChange', (e) => {
      this.lang = e.detail.dataset.lang;
    });
  }

  setDate(timezone) {
    this.timezone = timezone;
    this.hours = this.date.getHours() + timezone;
    if (this.hours >= 24) {
      this.hours -= 24;
      this.date.setDate(this.date.getDate() + 1);
    }
    if (this.hours < 0) {
      this.hours += 24;
      this.date.setDate(this.date.getDate() - 1);
    }
    this.setTime();
    this.setDateText();
  }

  setTime() {
    this.minutes = this.date.getMinutes();
    this.seconds = this.date.getSeconds();
    this.hoursEl.textContent = this.hours;
    this.minEl.textContent = this.minutes > 9 ? this.minutes : `0${this.minutes}`;
    this.secEl.textContent = this.seconds > 9 ? this.seconds : `0${this.seconds}`;
  }

  setDateText() {
    this.month = this.date.getMonth();
    this.day = this.date.getDay();
    this.dayWeekEl.textContent = this[this.lang].short[days[this.day]];
    this.dayWeekEl.dataset.trs = `short.${days[this.day]}`;
    this.monthEl.textContent = this[this.lang].months[months[this.month]];
    this.monthEl.dataset.trs = `months.${months[this.month]}`;
    this.dayMonthEl.textContent = this.date.getDate();
    this.setNextDays();
  }

  setNextDays() {
    let nextDay = this.date.getDay();
    nextDay = getNextDay(nextDay);
    this.nextDays.one.textContent = this[this.lang].full[days[nextDay]];
    this.nextDays.one.dataset.trs = `full.${days[nextDay]}`;
    nextDay = getNextDay(nextDay);
    this.nextDays.two.textContent = this[this.lang].full[days[nextDay]];
    this.nextDays.two.dataset.trs = `full.${days[nextDay]}`;
    nextDay = getNextDay(nextDay);
    this.nextDays.three.textContent = this[this.lang].full[days[nextDay]];
    this.nextDays.three.dataset.trs = `full.${days[nextDay]}`;
  }

  initTimer() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.timer = setInterval(() => {
      this.seconds += 1;
      if (this.seconds >= 60) {
        this.seconds = 0;
        this.changeMinutes();
      }
      this.secEl.textContent = this.seconds > 9 ? this.seconds : `0${this.seconds}`;
    }, 1000);
  }

  changeMinutes() {
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
      this.date = new Date(new Date().toLocaleString('en-US', { timeZone: 'UTC' }));
      this.setDate(this.timezone);
    } else {
      this.hoursEl.textContent = this.hours;
    }
  }
}
