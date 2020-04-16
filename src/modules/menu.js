import GoToPage from '@modules/gotopage';

function importAll(r) {
  return r.keys().map(r);
}

importAll(require.context('../assets/img/', false, /\.svg$/));

const { body } = document;

export default class Menu {
  constructor(categories) {
    this.categories = categories;
  }

  init() {
    const header = document.createElement('header');
    const menu = document.createElement('nav');
    const list = document.createElement('ul');
    const menuBtn = document.createElement('button');
    header.classList.add('header', 'container');
    menu.classList.add('nav');
    list.classList.add('nav_list');
    menuBtn.innerHTML = '<span class="menu_btn_lines">';
    menuBtn.classList.add('menu_btn');
    menu.append(menuBtn);
    menu.append(list);
    header.append(menu);
    body.append(header);
    this.categories.forEach((item) => {
      list.append(Menu.creatElementList(item));
    });

    menuBtn.addEventListener('click', () => {
      menu.classList.toggle('active');
    });

    menu.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.closest('.link')) {
        menu.classList.remove('active');
        const goToPage = new GoToPage(e.target.closest('.link'));
        goToPage.go();
      }
    });

    body.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && menu.classList.contains('active')) {
        menu.classList.remove('active');
      }
    });
  }

  static creatElementList(item) {
    const listElement = document.createElement('li');
    listElement.classList.add('nav_list_item');

    const listElementLink = document.createElement('a');
    listElementLink.classList.add('link');
    listElementLink.href = `${item.link}`;
    listElementLink.innerHTML = `
      <svg class="svg_icon">
        <use xlink:href="sprite.svg#${item.name}-icon"></use>
      </svg>
      <span>${item.title}</span>
    `;

    listElement.append(listElementLink);
    return listElement;
  }
}
