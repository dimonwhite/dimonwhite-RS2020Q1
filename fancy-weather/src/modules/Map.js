import marker from '../assets/img/pin.png';

export default class Map {
  constructor(ymaps) {
    this.ymaps = ymaps;
  }

  init() {
    this.myMap = new this.ymaps.Map('map', { center: [0, 0], zoom: 12, controls: [] });
    this.myPlacemark = new this.ymaps.Placemark(this.myMap.getCenter(), {
      hintContent: 'Собственный значок метки',
      balloonContent: 'Это красивая метка',
    }, {
      iconLayout: 'default#image',
      iconImageHref: marker,
      iconImageSize: [44, 44],
      iconImageOffset: [-22, -40],
    });
    this.myMap.geoObjects.add(this.myPlacemark);
  }

  setCenter(lat, lng) {
    this.ymaps.ready(() => {
      this.myMap.setCenter([lat, lng]);
      this.myPlacemark.geometry.setCoordinates([lat, lng]);
    });
  }
}
