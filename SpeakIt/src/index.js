import './assets/scss/main.scss';

import Game from '@modules/game';

function importAll(r) {
  return r.keys().map(r);
}

importAll(require.context('./assets/img/', false, /\.svg$/));

const game = new Game(0);
game.change();
game.init();

function closePreload() {
  this.parentNode.classList.add('hide');
}

document.querySelector('.preload .btn').addEventListener('click', closePreload);
