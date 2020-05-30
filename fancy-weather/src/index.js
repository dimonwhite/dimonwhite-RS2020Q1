import './assets/scss/main.scss';
import App from '@modules/App';

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

const app = new App();
app.init();
