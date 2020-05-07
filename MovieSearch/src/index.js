import './assets/scss/main.scss';
import Search from '@modules/search';
import Keyboard from './plugins/virtual-keyboard-module/assets/js/main';

function importAll(r) {
  return r.keys().map(r);
}

importAll(require.context('./assets/img/', false, /\.svg$/));

const keyboardBtn = document.querySelector('.keyboard_btn');
const searchInput = document.querySelector('.search_input');

let keyboard;
const keyboardWrap = document.querySelector('.keyboard_wrap');
function keyboardSwitchState() {
  if (!keyboard) {
    keyboard = new Keyboard(keyboardWrap, searchInput);
    keyboard.init();
  }
  this.classList.toggle('active');
  if (this.classList.contains('active')) {
    keyboardWrap.classList.add('active');
  } else {
    keyboardWrap.classList.remove('active');
  }
}

keyboardBtn.addEventListener('click', keyboardSwitchState);

const search = new Search();

search.init();
