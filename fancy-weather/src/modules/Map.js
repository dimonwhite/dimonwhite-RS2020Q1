import marker from '../assets/img/pin.png';

export default class Map {
  constructor(app) {
    this.app = app;
    this.ymaps = window.ymaps;
  }

  init() {
    this.ymaps.ready(() => {
      this.myMap = new this.ymaps.Map('map', { center: [0, 0], zoom: 12, controls: [] });
      this.newPlacemark();

      this.myMap.events.add('click', (e) => {
        this.getCoords(e);
      });
    });
  }

  newPlacemark() {
    this.myPlacemark = new this.ymaps.Placemark(this.myMap.getCenter(), {}, {
      iconLayout: 'default#image',
      iconImageHref: marker,
      iconImageSize: [44, 44],
      iconImageOffset: [-22, -40],
    });
    this.myMap.geoObjects.add(this.myPlacemark);
  }

  getCoords(e) {
    const coords = e.get('coords');
    this.myPlacemark.geometry.setCoordinates(coords);
    this.app.city = `${coords[0]}+${coords[1]}`;
    this.app.getInfo();
  }

  setCenter(lat, lng) {
    this.ymaps.ready(() => {
      this.myMap.setCenter([lat, lng]);
      this.myPlacemark.geometry.setCoordinates([lat, lng]);
    });
  }
}
