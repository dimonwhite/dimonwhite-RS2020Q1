import './assets/scss/main.scss';

import categories from '@modules/categories';
import Menu from '@modules/menu';

const menu = new Menu(categories);

menu.init();
