import words from '@data/words';

export default class Statistics {
  constructor(main) {
    this.main = main;
    this.statistics = localStorage.getItem('statistics')
      ? JSON.parse(localStorage.getItem('statistics'))
      : false;
  }

  init() {
    const tableWrap = document.createElement('div');
    tableWrap.classList.add('table_wrapper');
    const table = document.createElement('table');
    table.classList.add('table');
    tableWrap.append(table);
    this.main.append(tableWrap);
    table.innerHTML = `
      <thead>
        <tr>
          <th>Word</th>
          <th>Train</th>
          <th>Success</th>
          <th>Errors</th>
        </tr>
      </thead>
    `;
    Object.keys(this.statistics).forEach((key) => {
      console.log(this.statistics[key]);
      const item = this.statistics[key];
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.title}(${item.translation})</td>
        <td>${item.train}</td>
        <td>${item.success}</td>
        <td>${item.error}</td>
      `;
      table.append(row);
    });
  }

  create() {
    if (!this.statistics) {
      this.statistics = {};
      Object.keys(words).forEach((key) => {
        words[key].forEach((item) => {
          this.statistics[item.name] = {
            category: key,
            title: item.title,
            translation: item.translation,
            train: 0,
            success: 0,
            error: 0,
          };
        });
      });

      localStorage.setItem('statistics', JSON.stringify(this.statistics));
    }
  }
}
