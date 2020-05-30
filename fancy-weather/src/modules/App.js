import { ipinfo, opencagedata, weatherAPI } from '@/constants';
import fetchJSON from '@/utils';
import Translate from '@modules/Translate';
import Dropdown from '@modules/Dropdown';
import Map from '@modules/Map';
import Info from '@modules/Info';

const infoClass = new Info();

export default class App {
  constructor() {
    this.info = {};
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
        this.ENCity = city;
        const info = data.results[0];
        this.info.city = info.components.city;
        this.info.country = info.components.country;
        this.fullLat = info.geometry.lat;
        this.fullLng = info.geometry.lng;
        this.info.lat = App.changeGeometry(String(info.geometry.lat));
        this.info.lng = App.changeGeometry(String(info.geometry.lng));
        console.log(this);
        this.getWeather();
        this.map.setCenter(this.fullLat, this.fullLng);
      });
  }

  getWeather() {
    fetchJSON(`${weatherAPI}&lat=${this.fullLat}&lon=${this.fullLng}&lang=${this.lang}`)
      .then((data) => {
        console.log(data);
        infoClass.changeInfo(this.info);
        this.dropdown.changeActiveElememnt(document.querySelector(`[data-lang=${this.lang}]`));
      });
  }

  static changeGeometry(geometry) {
    const geometryItem = geometry.split('.');
    return `${geometryItem[0]}°${geometryItem[1].slice(0, 2)}'`;
  }

  createMap() {
    this.map = new Map(this.ymaps);
    this.ymaps.ready(() => {
      this.map.init();
    });
  }
}
