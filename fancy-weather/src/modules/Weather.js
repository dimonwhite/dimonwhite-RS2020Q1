import { celToFah, fahToCel, getResult } from '@/utils';
import ImageWeather from '@modules/ImgWeather';

export default class Weather {
  constructor() {
    this.elements = document.querySelectorAll('[data-weather]');
    this.imgs = document.querySelectorAll('[data-img]');
    this.degreesFormat = localStorage.getItem('degreesFormat') || 'cel';
    this.imageWeather = new ImageWeather();
  }

  changeInfo(info) {
    this.changeText(info);
    this.changeImgs(info);
  }

  changeText(info) {
    this.elements.forEach((el) => {
      const elInfo = el.dataset.weather;
      const path = elInfo.split('.');
      const result = getResult(path, info);
      const element = el;
      if (el.classList.contains('degreesNumber')) {
        element.textContent = this.degreesFormat === 'cel' ? result : celToFah(result);
      } else {
        element.textContent = result;
      }
    });
  }

  changeImgs(info) {
    this.imgs.forEach((el) => {
      const elInfo = el.dataset.img;
      const path = elInfo.split('.');
      const result = getResult(path, info);
      const element = el;
      const nameImg = `icon${result.slice(0, -1)}`;
      if (element.classList.contains('weather_main_img')) {
        element.setAttribute('class', 'weather_main_img');
      } else {
        element.setAttribute('class', 'briefly_item_img');
      }
      element.classList.add(nameImg);
      element.innerHTML = this.imageWeather.generateImg(nameImg);
    });
  }

  changeDegrees(value) {
    this.degreesFormat = value;
    localStorage.setItem('degreesFormat', this.degreesFormat);
    document.querySelectorAll('.degreesNumber').forEach((item) => {
      const el = item;
      el.textContent = value === 'fah' ? celToFah(el.textContent) : fahToCel(el.textContent);
    });
  }
}
