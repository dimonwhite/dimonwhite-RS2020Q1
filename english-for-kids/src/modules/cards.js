import words from '@data/words';
import categories from '@data/categories';

export default class Cards {
  constructor(category, main) {
    this.category = category;
    this.main = main;
  }

  init() {
    this.main.classList.remove('main_page');
    words[this.category].forEach((item) => {
      const card = document.createElement('div');
      const cardWrap = document.createElement('div');
      card.classList.add('card');
      card.dataset.name = item.name;
      cardWrap.classList.add('card_wrapper');

      const image = require(`../assets/img/${this.category}/${item.image}`);

      card.innerHTML = `
        <div class="front">
          <img class="card_img" src="${image.default}" alt="${item.title}">
          <div class="card_title">
            ${item.title}
          </div>
        </div>
        <div class="back">
          <img class="card_img" src="${image.default}" alt="${item.title}">
          <div class="card_title">${item.translation}</div>
        </div>
        <svg class="svg_icon rotate">
          <use xlink:href="sprite.svg#rotate"></use>
        </svg>
      `;

      cardWrap.append(card);
      this.main.append(cardWrap);
    });
    const starWrap = document.createElement('div');
    starWrap.classList.add('star_wrapper');
    this.main.append(starWrap);
    const gameBtn = document.createElement('button');
    gameBtn.classList.add('game_btn');
    gameBtn.innerText = 'Start';
    const gameBtnSvg = document.createElement('div');
    gameBtnSvg.innerHTML = `
      <svg class="svg_icon">
        <use xlink:href="sprite.svg#repeat"></use>
      </svg>
    `;
    this.addTitle();
    gameBtn.append(gameBtnSvg);
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('btn_wrapper');
    btnWrapper.append(gameBtn);
    this.main.append(btnWrapper);
  }

  addTitle() {
    const activeCategory = categories.filter((item) => item.link === `?page=${this.category}`);
    const { title } = activeCategory[0];
    const headerTitle = document.createElement('h1');
    headerTitle.classList.add('page_title');
    headerTitle.innerHTML = title;
    this.main.append(headerTitle);
  }
}
