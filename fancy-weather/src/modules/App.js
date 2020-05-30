import { ipinfo, opencagedata } from '@/constants';
import fetchJSON from '@/utils';
import Translate from '@modules/Translate';
import Dropdown from '@modules/Dropdown';

export default class App {
  constructor() {
    this.info = {};
    this.translate = new Translate();
  }

  init() {
    const dropdown = new Dropdown('.dropdown', '.dropdown_top', '.dropdown_list');
    dropdown.init();

    this.translate.init();
    this.lang = this.translate.lang;

    dropdown.changeActiveElememnt(document.querySelector(`[data-lang=${this.lang}]`));
    this.getCity();
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
        console.log(info);
        this.info.city = info.components.city;
        this.info.country = info.components.country;
        this.info.lat = App.changeGeometry(String(info.geometry.lat));
        this.info.lng = App.changeGeometry(String(info.geometry.lng));
        console.log(this);
      });
  }

  static changeGeometry(geometry) {
    const geometryItem = geometry.split('.');
    return `${geometryItem[0]}°${geometryItem[1].slice(0, 2)}'`;
  }
}
