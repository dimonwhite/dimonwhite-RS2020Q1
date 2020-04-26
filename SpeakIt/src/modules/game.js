import Card from './card';
import { urlGitHub, yandexTranslate, wordAPI } from '../constants';

export default class Game {
  constructor(level) {
    this.level = level;
    this.levelWrap = document.querySelector('.level_wrap');
    this.gameBlock = document.querySelector('.game');
    this.gameWord = document.querySelector('.game_word');
    this.scoreBlock = document.querySelector('.score');
    this.wordList = document.querySelector('.word_list');
    this.img = document.querySelector('.game_img');
    this.translation = document.querySelector('.translation');
    this.startBtn = document.querySelector('.btn.start');
    this.newGame = document.querySelector('.btn.new_game');
    this.newGamePopup = document.querySelector('.btn.new_game_popup');
    this.result = document.querySelector('.btn.result');
    this.closePopupBtn = document.querySelector('.btn.close_popup');
    this.popup = document.querySelector('.popup');
    this.errorsBlock = document.querySelector('.errors_block');
    this.successBlock = document.querySelector('.success_block');
    this.audio = new Audio();
    this.game = false;
    this.score = 0;
    this.page = 0;
  }

  init() {
    this.levelWrap.addEventListener('click', (e) => {
      this.clickLevel(e);
    });
    this.wordList.addEventListener('click', (e) => {
      this.clickWordList(e);
    });
    this.startBtn.addEventListener('click', () => {
      this.clickStart();
    });
    this.newGame.addEventListener('click', () => {
      this.stop();
      this.change();
    });
    this.newGamePopup.addEventListener('click', () => {
      this.closePopup()
      this.change();
    });
    this.result.addEventListener('click', () => {
      this.openPopup();
    });
    this.closePopupBtn.addEventListener('click', () => {
      this.closePopup();
    });
    this.popup.addEventListener('click', (e) => {
      this.clickResultList(e);
    });

    this.createRecognition();
  }

  getWords() {
    return fetch(`${wordAPI}?page=${this.page}&group=${this.level}`)
      .then((response) => response.json());
  }

  change() {
    this.wordList.innerHTML = '';
    this.getWords()
      .then((data) => {
        this.dataWords = data.slice(0, 10);
        this.createWords(this.dataWords);
        this.page = this.page === 29 ? 0 : this.page + 1;
      });
  }

  createWords(words) {
    words.forEach((item, key) => {
      const card = new Card(item, key);
      this.wordList.append(card.create());
    });
  }

  clickLevel(e) {
    const levelBtn = e.target.closest('.level_item:not(.active)');
    if (levelBtn) {
      this.removeActive();
      levelBtn.classList.add('active');
      this.level = levelBtn.dataset.level;
      this.change();
      this.stop();
    }
  }

  removeActive() {
    this.levelWrap.querySelectorAll('.level_item.active').forEach((item) => {
      item.classList.remove('active');
    });
  }

  clickWordList(e) {
    const card = e.target.closest('.word_list_item');
    if (card && !this.game) {
      const cardActive = this.wordList.querySelector('.word_list_item.active');
      if (cardActive) {
        cardActive.classList.remove('active');
      }
      card.classList.add('active');
      this.editInfo(card.dataset.id);
      this.playAudio(card.dataset.id);
    }
  }

  playAudio(id) {
    const audio = `${urlGitHub}${this.dataWords[id].audio.replace('files/', '')}`;
    this.audio.src = audio;
    this.audio.play();
  }

  editInfo(id) {
    const image = `${urlGitHub}${this.dataWords[id].image.replace('files/', '')}`;
    this.getTranslate(id)
      .then((data) => {
        const translation = data.text[0];
        this.img.src = image;
        this.translation.innerText = translation;
      });
  }

  getTranslate(id) {
    return fetch(`${yandexTranslate}&text=${this.dataWords[id].word}&lang=en-ru`)
      .then((response) => response.json());
  }

  clickStart() {
    this.dropScore();
    if (this.game) {
      this.stop();
    } else {
      this.startBtn.classList.add('active');
      this.startBtn.innerText = 'Stop';
      this.gameBlock.classList.add('active');
      this.game = true;
      this.recognition.start();
    }
  }

  stop() {
    this.startBtn.classList.remove('active');
    this.startBtn.innerText = 'Start';
    this.gameBlock.classList.remove('active');
    this.game = false;
    this.recognition.stop();
    this.dataWords.forEach((item) => {
      item.success = false;
    });
  }

  dropScore() {
    this.score = 0;
    this.wordList.querySelectorAll('.word_list_item.active').forEach((item) => {
      item.classList.remove('active');
    });
    this.scoreBlock.innerHTML = '';
  }

  createRecognition() {
    const MySpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition;
    this.recognition = new MySpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';
    this.recognition.maxAlternatives = 30;
    this.recognition.addEventListener('result', (e) => {
      this.resultRecognition(e);
    });
  }

  resultRecognition(e) {
    let success = false;
    const i = e.resultIndex;
    if (e.results[i].isFinal) {
      let resultWord = e.results[i][0].transcript.trim().toLowerCase();
      const resultWords = e.results[i];
      this.dataWords.every((item, id) => {
        Object.keys(resultWords).every((key) => {
          let word_item = typeof resultWords[key] === 'object' ? resultWords[key].transcript : '';
          word_item = word_item.trim().toLowerCase();
          if (word_item === item.word.toLowerCase() && !item.success) {
            this.successCard(item, id);
            resultWord = word_item;
            success = true;
          }
          return !success;
        });
        return !success;
      });
      this.gameWord.innerText = resultWord;
    }
  }

  successCard(item, id) {
    item.success = true;
    const card = this.wordList.querySelector(`.word_list_item[data-id="${id}"]`);
    card.classList.add('active');
    this.scoreBlock.append(Game.createStar());
    this.editInfo(id);
    this.score += 1;
    if (this.score >= 10) {
      this.win();
    }
  }

  win() {
    this.openPopup();
    this.dropScore();
    this.stop();
  }

  static createStar() {
    const star = document.createElement('div');
    star.classList.add('star');
    star.innerHTML = `
      <svg class="svg_icon">
        <use xlink:href="sprite.svg#star"></use>
      </svg>
    `;
    return star;
  }

  openPopup() {
    this.errorsBlock.innerHTML = '';
    this.successBlock.innerHTML = '';
    this.popup.classList.add('active');
    const errors = document.querySelector('.popup_block .errors');
    const success = document.querySelector('.popup_block .success');
    errors.innerText = 10 - this.score;
    success.innerText = this.score;
    this.dataWords.forEach((item, key) => {
      if (item.success) {
        this.createResultItem(item, key, this.successBlock);
      } else {
        this.createResultItem(item, key, this.errorsBlock);
      }
    })
  }

  createResultItem(item, key, block) {
    const listItem = document.createElement('div');
    this.getTranslate(key)
      .then((data) => {
        const translation = data.text[0];
        listItem.classList.add('result_item');
        listItem.dataset.id = key;
        listItem.innerHTML = `
          <svg class="svg_icon">
            <use xlink:href="sprite.svg#volume"></use>
          </svg>
          <div class="text word">${item.word}</div>
          <div class="text">${item.transcription}</div>
          <div class="text">${translation}</div>
        `;
        block.append(listItem);
      });
  }

  closePopup() {
    this.popup.classList.remove('active');
  }

  clickResultList(e) {
    const resultItem = e.target.closest('.result_item');
    if (resultItem) {
      this.playAudio(resultItem.dataset.id);
    }
  }
}
