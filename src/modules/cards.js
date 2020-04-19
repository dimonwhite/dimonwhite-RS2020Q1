import words from '@data/words';

export default class Cards {
  constructor(category, main) {
    this.category = category;
    this.main = main;
  }

  init() {
    this.main.classList.remove('main_page');
    this.main.innerHTML = '<div class="star_wrapper"></div>';
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
    const gameBtn = document.createElement('button');
    gameBtn.classList.add('game_btn');
    gameBtn.innerText = 'Start';
    const gameBtnSvg = document.createElement('div');
    gameBtnSvg.innerHTML = `
      <svg class="svg_icon">
        <use xlink:href="sprite.svg#repeat"></use>
      </svg>
    `;
    gameBtn.append(gameBtnSvg);
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('btn_wrapper');
    btnWrapper.append(gameBtn);
    this.main.append(btnWrapper);
  }
}
