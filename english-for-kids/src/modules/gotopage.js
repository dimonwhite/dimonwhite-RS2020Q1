import Categories from '@modules/categories';
import dataCategories from '@data/categories';
import Cards from '@modules/cards';
import Statistics from '@modules/statistics';

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

    this.params = getParams();
    switch (this.params.page) {
      case undefined:
        this.initCategories();
        break;
      case 'statistics':
        this.initStatistics();
        break;
      default:
        this.initCards();
        break;
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

  initCategories() {
    const categories = new Categories(dataCategories, this.mainBlock);
    categories.init();
  }

  initCards() {
    const cards = new Cards(this.params.page, this.mainBlock);
    cards.init();
  }

  initStatistics() {
    const statistics = new Statistics(this.mainBlock);
    statistics.init();
  }
}
