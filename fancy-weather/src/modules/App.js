import { ipinfo, opencagedata, weatherAPI } from '@/constants';
import generateImage from '@modules/generateImage';
import {
  fetchJSON, getTimesOfDay, changeGeometry, objectAverage,
} from '@/utils';
import Translate from '@modules/Translate';
import Dropdown from '@modules/Dropdown';
import Map from '@modules/Map';
import Info from '@modules/Info';
import DateAndTime from '@modules/DateAndTime';
import Weather from '@modules/Weather';

const infoClass = new Info();
const date = new DateAndTime();
const weather = new Weather();

export default class App {
  constructor() {
    this.info = {};
    this.weather = {
      one: {},
      two: {},
      three: {},
    };
    this.translate = new Translate();
    this.ymaps = window.ymaps;
  }

  init() {
    this.dropdown = new Dropdown('.dropdown', '.dropdown_top', '.dropdown_list');
    this.dropdown.init();

    this.translate.init();
    this.lang = this.translate.lang;

    this.getCity();
    this.createMap();
    App.changeRadioDegrees();
    document.querySelector('.header .update')
      .addEventListener('click', () => {
        this.changeImage();
      });
    document.querySelectorAll('.radio_input').forEach((radio) => {
      radio.addEventListener('change', (e) => {
        weather.changeDegrees(e.target.value);
      });
    });
  }

  getCity() {
    fetchJSON(ipinfo)
      .then((data) => {
        this.getInfo(data.city);
      });
  }

  getInfo(city) {
    fetchJSON(`${opencagedata}&q=${city}&language=${this.lang}`)
      .then((data) => {
        const info = data.results[0];
        this.info.city = info.components.city;
        this.info.country = info.components.country;
        this.fullLat = info.geometry.lat;
        this.fullLng = info.geometry.lng;
        this.info.lat = changeGeometry(String(info.geometry.lat));
        this.info.lng = changeGeometry(String(info.geometry.lng));
        this.timezone = info.annotations.timezone.offset_sec / 3600;
        this.getWeather();
        this.map.setCenter(this.fullLat, this.fullLng);
      });
  }

  getWeather() {
    fetchJSON(`${weatherAPI}&lat=${this.fullLat}&lon=${this.fullLng}&lang=${this.lang}`)
      .then((data) => {
        this.setWeatherInfo(data);
        infoClass.changeInfo(this.info);
        this.dropdown.changeActiveElememnt(document.querySelector(`[data-lang=${this.lang}]`));
        date.init(this.lang, this.timezone);
        this.changeImage();
        document.body.classList.add('active');
      });
  }

  createMap() {
    this.map = new Map(this.ymaps);
    this.ymaps.ready(() => {
      this.map.init();
    });
  }

  changeImage() {
    fetchJSON(`${weatherAPI}&lat=${this.fullLat}&lon=${this.fullLng}&lang=en`)
      .then((data) => {
        const timesOfDay = getTimesOfDay(date.hours);
        generateImage(`${data.current.weather[0].description} ${timesOfDay}`);
      });
  }

  setWeatherInfo(data) {
    const { current } = data;
    this.weather.degrees = Math.round(current.temp);
    this.weather.feelsLike = Math.round(current.feels_like);
    this.weather.wind = Math.round(current.wind_speed);
    this.weather.humidity = current.humidity;
    this.weather.weather = current.weather[0].description;
    this.weather.img = current.weather[0].icon;
    ['one', 'two', 'three'].forEach((day, i) => {
      this.weather[day].degrees = Math.round(objectAverage(data.daily[i + 1].temp));
      this.weather[day].img = data.daily[i + 1].weather[0].icon;
    });
    weather.changeInfo(this.weather);
  }

  static changeRadioDegrees() {
    document.querySelector(`[value="${weather.degreesFormat}"]`).checked = true;
  }
}
