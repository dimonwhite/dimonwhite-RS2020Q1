import Categories from '@modules/categories';
import dataCategories from '@data/categories';
import Cards from '@modules/cards';

const getParams = () => window
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

export { getParams };

export default class GoToPage {
  constructor(link) {
    this.link = link;
    this.mainBlock = document.querySelector('.main_block');
  }

  go() {
    const state = {
      page: this.link.href,
    };

    window.history.pushState(state, '', state.page);
    this.change();
  }

  change() {
    this.mainBlock.innerHTML = '';

    const params = getParams();

    if (params.page === undefined) {
      const categories = new Categories(dataCategories, this.mainBlock);

      categories.init();
    } else {
      const cards = new Cards(params.page, this.mainBlock);

      cards.init();
    }
    let page = window.location.search;
    if (!page) {
      page = '/';
    }
    const activeLink = document.querySelector('.link.active');
    if (activeLink) {
      activeLink.classList.remove('active');
    }
    document.querySelector(`.link[href="${page}"]`).classList.add('active');
  }
}
