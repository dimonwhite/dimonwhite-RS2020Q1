import './assets/scss/main.scss';

import dataCategories from '@data/categories';
import Menu from '@modules/menu';
import GoToPage from '@modules/gotopage';
import ClickMainBlock from '@modules/clickMainBlock';
import Game from '@modules/game';

const menu = new Menu(dataCategories);
menu.init();

const main = document.createElement('main');
const mainBlock = document.createElement('div');
main.classList.add('main', 'container');
mainBlock.classList.add('main_block');
main.append(mainBlock);
document.body.append(main);

const goToPage = new GoToPage();

goToPage.change();

window.addEventListener('popstate', () => {
  goToPage.change();
});

const game = new Game();
game.init();

const clickMainBlock = new ClickMainBlock(mainBlock);

clickMainBlock.init();
