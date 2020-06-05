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
import Popup from '@modules/Popup';
import Listen from '@modules/Listen';
import Speak from '@modules/Speak';

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
    this.popup = new Popup(this);
    this.image = new ImageBg(this.popup, 600);
    this.listen = new Listen(this, weather);
    this.Speak = new Speak(this);
    this.preloaded = document.querySelector('.preloaded');
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
    this.popup.init();
    this.Speak.init();
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
      this.search(e);
    });
    document.querySelector('.play').addEventListener('click', () => {
      this.listen.make(this.lang, this.weather);
    });
    document.querySelector('.home').addEventListener('click', () => {
      this.city = this.cityHome;
      this.getInfo();
    });
    document.querySelector('.infoBtn').addEventListener('click', () => {
      this.popup.showInfo();
    });
  }

  search(e) {
    e.preventDefault();
    const { value } = e.target.querySelector('.search');
    if (value.length < 1) {
      this.popup.showError('empty');
    } else {
      this.city = value;
      this.getInfo();
    }
  }

  getCity() {
    fetchJSON(ipinfo)
      .then((data) => {
        this.cityHome = data.city;
        this.city = data.city;
        this.getInfo();
      });
  }

  requestCityInfo() {
    return fetchJSON(`${opencagedata}&q=${this.city}&language=${this.lang}`);
  }

  getInfo() {
    this.startPreloaded();
    this.requestCityInfo()
      .then((data) => {
        if (data.total_results > 0) {
          this.setInfo(data);
        } else {
          this.showError('errorData');
          this.stopPreloaded();
        }
      });
  }

  setInfo(data) {
    const info = data.results[0];
    this.info.city = info.components.hamlet || info.components.village
      || info.components.city || info.components.county || info.components.neighbourhood
      || info.components.state || info.components.region;
    if (!this.info.city) {
      // eslint-disable-next-line no-underscore-dangle
      const type = info.components._type;
      this.info.city = info.components[type];
    }
    this.info.country = info.components.country;
    this.fullLat = info.geometry.lat;
    this.fullLng = info.geometry.lng;
    this.info.lat = changeGeometry(String(info.geometry.lat));
    this.info.lng = changeGeometry(String(info.geometry.lng));
    this.timezone = info.annotations.timezone.offset_sec / 3600;
    this.getWeather();
  }

  showError(text) {
    this.popup.showError(text);
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
        this.map.setCenter(this.fullLat, this.fullLng);
        this.stopPreloaded();
      });
  }

  createMap() {
    this.map = new Map(this);
    this.map.init();
  }

  changeImage() {
    const timesOfDay = getTimesOfDay(date.hours);
    const season = getSeason(date.month);
    this.image.getImage(`${timesOfDay},${season}`);
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

  startPreloaded() {
    this.preloaded.classList.add('active');
  }

  stopPreloaded() {
    this.preloaded.classList.remove('active');
  }
}
