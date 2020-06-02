import { ipinfo, opencagedata, weatherAPI } from '@/constants';
import ImageBg from '@modules/ImageBg';
import {
  fetchJSON, getTimesOfDay, changeGeometry, objectAverage, getSeason,
} from '@/utils';
import Translate from '@modules/Translate';
import Dropdown from '@modules/Dropdown';
import Map from '@modules/Map';
import Info from '@modules/Info';
import DateAndTime from '@modules/DateAndTime';
import Weather from '@modules/Weather';
import Error from '@modules/Error';

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
    this.translate = new Translate(this);
    this.ymaps = window.ymaps;
    this.error = new Error();
    this.image = new ImageBg(this.error, 600);
  }

  init() {
    this.dropdown = new Dropdown('.dropdown', '.dropdown_top', '.dropdown_list');
    this.dropdown.init();

    this.translate.init();
    this.lang = this.translate.lang;

    this.getCity();
    this.createMap();
    App.changeRadioDegrees();
    this.addListeners();
    this.dropdown.changeActiveElement(document.querySelector(`[data-lang=${this.lang}]`));
    this.error.init();
  }

  addListeners() {
    document.querySelector('.header .update')
      .addEventListener('click', () => {
        this.changeImage();
      });
    document.querySelectorAll('.radio_input').forEach((radio) => {
      radio.addEventListener('change', (e) => {
        weather.changeDegrees(e.target.value);
      });
    });
    document.querySelector('.header_form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.city = e.target.querySelector('.search').value;
      this.getInfo();
    });
  }

  getCity() {
    fetchJSON(ipinfo)
      .then((data) => {
        this.city = data.city;
        this.getInfo();
      });
  }

  requestCityInfo() {
    return fetchJSON(`${opencagedata}&q=${this.city}&language=${this.lang}`);
  }

  getInfo() {
    this.requestCityInfo()
      .then((data) => {
        if (data.total_results > 0) {
          this.setInfo(data);
        } else {
          this.showError('Неверные данные');
        }
      });
  }

  setInfo(data) {
    const info = data.results[0];
    // eslint-disable-next-line no-underscore-dangle
    const type = info.components._type;
    this.info.city = info.components.hamlet || info.components[type] || info.components.county;
    this.info.country = info.components.country;
    this.fullLat = info.geometry.lat;
    this.fullLng = info.geometry.lng;
    this.info.lat = changeGeometry(String(info.geometry.lat));
    this.info.lng = changeGeometry(String(info.geometry.lng));
    this.timezone = info.annotations.timezone.offset_sec / 3600;
    this.getWeather();
    this.map.setCenter(this.fullLat, this.fullLng);
  }

  showError(text) {
    this.error.showError(text);
  }

  requestWeatherInfo() {
    return fetchJSON(`${weatherAPI}&lat=${this.fullLat}&lon=${this.fullLng}&lang=${this.lang}`);
  }

  getWeather() {
    this.requestWeatherInfo()
      .then((data) => {
        this.setWeatherInfo(data);
        infoClass.changeInfo(this.info);
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
    const timesOfDay = getTimesOfDay(date.hours);
    const season = getSeason(date.month);
    this.image.getImage(`${season} ${timesOfDay}`);
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
