import words from '@data/words';

export default class Cards {
  constructor(category, main) {
    this.category = category;
    this.main = main;
  }

  init() {
    words[this.category].forEach((item) => {
      const card = document.createElement('div');
      const cardWrap = document.createElement('div');
      card.classList.add('card');
      cardWrap.classList.add('card_wrapper');

      const image = require(`../assets/img/${this.category}/${item.image}`);

      card.innerHTML = `
        <div class="front">
          <img class="card_img" src="${image.default}" alt="${item.title}">
          <div class="card_title">
            ${item.title}
            <svg class="svg_icon rotate">
              <use xlink:href="sprite.svg#rotate"></use>
            </svg>
          </div>
        </div>
        <div class="back">
          <img class="card_img" src="${image.default}" alt="${item.title}">
          <div class="card_title">${item.translation}</div>
        </div>
      `;

      card.querySelector('.rotate').addEventListener('click', Cards.rotateCard);

      cardWrap.append(card);
      this.main.append(cardWrap);
    });
  }

  static rotateCard() {
    console.log(this.closest('.card'));
    this.closest('.card').classList.add('rotate');
  }
}
