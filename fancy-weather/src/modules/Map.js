export default class Map {
  constructor(ymaps) {
    this.ymaps = ymaps;
  }

  init() {
    this.myMap = new this.ymaps.Map('map', { center: [0, 0], zoom: 12, controls: [] });
  }

  setCenter(lat, lng) {
    this.ymaps.ready(() => {
      this.myMap.setCenter([lat, lng]);
    });
  }
}
