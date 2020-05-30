import './assets/scss/main.scss';
import App from '@modules/App';

function importAll(r) {
  return r.keys().map(r);
}

importAll(require.context('./assets/img/', false, /\.svg$/));

const app = new App();
app.init();
