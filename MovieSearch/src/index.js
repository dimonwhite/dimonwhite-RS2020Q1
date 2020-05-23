import './assets/scss/main.scss';
import Search from '@modules/search';
import Swiper from 'swiper';
import Keyboard from './plugins/virtual-keyboard/assets/js/main';
import Favorites from './modules/favorites';

function importAll(r) {
  return r.keys().map(r);
}

importAll(require.context('./assets/img/', false, /\.svg$/));

const swiper = new Swiper('.swiper-container', {
  centerInsufficientSlides: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    500: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    800: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: 50,
    },
  },
});

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

const search = new Search(swiper);
search.init();

const favorites = new Favorites(swiper);
favorites.init();
