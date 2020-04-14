import './assets/scss/main.scss';

import dataCategories from '@data/categories';
import Menu from '@modules/menu';

import Categories from '@modules/categories';
import Cards from '@modules/cards';

const menu = new Menu(dataCategories);

menu.init();

const main = document.createElement('main');
const mainBlock = document.createElement('div');
main.classList.add('main', 'container');
mainBlock.classList.add('main_block');
main.append(mainBlock);
document.body.append(main);

const params = window
  .location
  .search
  .replace('?', '')
  .split('&')
  .reduce(
    (p, e) => {
      const a = e.split('=');
      const accum = p;
      accum[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
      return accum;
    },
    {},
  );

if (params.page === undefined) {
  const categories = new Categories(dataCategories, mainBlock);

  categories.init();
} else {
  const cards = new Cards(params.page, mainBlock);

  cards.init();
}
