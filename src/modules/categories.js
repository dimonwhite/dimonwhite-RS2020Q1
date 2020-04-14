export default class Categories {
  constructor(categories, main) {
    this.categories = categories;
    this.main = main;
  }

  init() {
    this.categories.forEach((item) => {
      if (item.use === 'category') {
        const card = document.createElement('a');
        card.classList.add('category_card');
        card.href = item.link;
        // eslint-disable-next-line global-require,import/no-dynamic-require
        const image = require(`../assets/img/${item.image}`);

        card.innerHTML = `
          <img class="category_card_img" src="${image.default}">
          <div class="category_card_title">${item.title}</div>
        `;
        this.main.append(card);
      }
    });
  }
}
