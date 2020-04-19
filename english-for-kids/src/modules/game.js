import GoToPage, { getParams } from '@modules/gotopage';
import words from '@data/words';
import error from '../assets/sound/error.mp3';
import success from '../assets/sound/correct.mp3';
import losing from '../assets/sound/losing.mp3';
import win from '../assets/sound/win.mp3';
import winImg from '../assets/img/win.png';
import wasted from '../assets/img/wasted.png';

export default class Game {
  constructor() {
    this.statistics = JSON.parse(localStorage.getItem('statistics'));
    this.audio = new Audio();
    this.accuracy = new Audio();
    this.idWord = 0;
    this.startGame = false;
    this.error = 0;
  }

  init() {
    const header = document.querySelector('.header');

    const gameInput = document.createElement('input');
    gameInput.type = 'checkbox';
    gameInput.checked = true;
    gameInput.classList.add('switch_input');

    const gameLabel = document.createElement('label');
    gameLabel.classList.add('switch');

    const gameText = document.createElement('div');
    gameText.classList.add('switch_label');

    const gameHandle = document.createElement('div');
    gameHandle.classList.add('switch_handle');

    gameLabel.append(gameInput);
    gameLabel.append(gameText);
    gameLabel.append(gameHandle);

    header.append(gameLabel);

    gameInput.addEventListener('change', (e) => {
      window.gameVar = !e.target.checked;
      if (window.gameVar) {
        document.body.classList.add('game');
      } else {
        document.body.classList.remove('game');
        this.stop();
      }
    });

    document.addEventListener('click', (e) => {
      if (e.target.closest('.game_btn')) {
        this.gameBtn = document.querySelector('.game_btn');
        const category = getParams().page;
        if (!this.gameBtn.classList.contains('active')) {
          this.gameBtn.classList.add('active');
          this.start(category);
        } else {
          this.replay();
        }
      }
    });

    const mainBlock = document.querySelector('.main_block');
    mainBlock.addEventListener('click', (e) => {
      this.clickCard(e);
    });

    this.initPopup();
  }

  start(category) {
    this.idWord = 0;
    this.error = 0;
    this.starsWrap = document.querySelector('.star_wrapper');
    this.words = Game.arrayRandom(words[category]);
    this.startGame = true;
    this.step();
  }

  step() {
    if (this.idWord === this.words.length) {
      this.result();
      this.stop();
      return;
    }
    this.word = this.words[this.idWord].name;
    const sound = require(`../assets/sound/${this.word}.mp3`);
    this.audio.src = sound.default;
    this.audio.play();
    this.startGame = true;
  }

  replay() {
    this.audio.play();
  }

  clickCard(e) {
    if (e.target.closest('.card:not(.performed)') && this.startGame) {
      const card = e.target.closest('.card');
      const { name } = card.dataset;

      if (this.word === name) {
        this.statistics[this.word].success += 1;
        card.classList.add('performed');
        this.accuracy.src = success;
        this.accuracy.play();
        this.choice(true);
        this.startGame = false;
      } else {
        this.statistics[this.word].error += 1;
        this.accuracy.src = error;
        this.accuracy.play();
        this.error += 1;
        this.choice(false);
      }
      localStorage.setItem('statistics', JSON.stringify(this.statistics));
    }
  }

  choice(accuracy) {
    const star = document.createElement('div');
    star.classList.add('star');
    star.innerHTML = `
      <svg class="svg_icon">
        <use xlink:href="sprite.svg#${accuracy ? 'star' : 'star-error'}"></use>
      </svg>
    `;
    this.starsWrap.append(star);

    if (accuracy) {
      this.accuracy.onended = () => {
        this.accuracy.onended = '';
        this.idWord += 1;
        this.step();
      };
    }
  }

  stop() {
    document.querySelector('.game_btn').classList.remove('active');
    this.startGame = false;
    this.starsWrap.innerHTML = '';
    document.querySelectorAll('.card.performed').forEach((item) => {
      item.classList.remove('performed');
    });
  }

  static arrayRandom(array) {
    const newArray = new Array(...array);
    let j;
    let temp;
    for (let i = newArray.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1));
      temp = newArray[j];
      newArray[j] = newArray[i];
      newArray[i] = temp;
    }
    return newArray;
  }

  result() {
    if (this.error > 0) {
      this.audio.src = losing;
      this.popup.innerHTML = `
        <img src="${wasted}" alt="Wasted" class="img">
        <div class="text">${this.error} errors</div>
      `;
    } else {
      this.audio.src = win;
      this.popup.innerHTML = `
        <img src="${winImg}" alt="Win" class="img">
      `;
    }
    this.audio.play();
    this.popupWrap.classList.add('active');
    setTimeout(() => {
      window.history.pushState(null, null, '/');
      this.goToPage.change();
      this.popupWrap.classList.remove('active');
    }, 4000);
  }

  initPopup() {
    this.popupWrap = document.createElement('div');
    this.popupWrap.classList.add('popup_wrap');
    this.popup = document.createElement('div');
    this.popup.classList.add('popup');
    this.popupWrap.append(this.popup);
    document.body.append(this.popupWrap);

    this.goToPage = new GoToPage();
  }
}
