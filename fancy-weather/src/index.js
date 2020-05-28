import './assets/scss/main.scss';
import Dropdown from '@modules/dropdown';

function importAll(r) {
  return r.keys().map(r);
}

importAll(require.context('./assets/img/', false, /\.svg$/));

window.init = () => {
  const { ymaps } = window;
  const result = [56.85606906383647, 35.90342128558974];
  // eslint-disable-next-line no-unused-vars
  const myMap = new ymaps.Map('map', { center: result, zoom: 12, controls: [] });
};

const dropdown = new Dropdown('.dropdown', '.dropdown_top', '.dropdown_list');

dropdown.init();
