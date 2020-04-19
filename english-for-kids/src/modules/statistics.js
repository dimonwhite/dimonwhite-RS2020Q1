import words from '@data/words';

export default class Statistics {
  constructor(main) {
    this.main = main;
    this.statistics = localStorage.getItem('statistics')
      ? JSON.parse(localStorage.getItem('statistics'))
      : false;
  }

  init() {
    this.addBtns();
    this.createTable();
    this.outputStatistics();

    this.resetBtn.addEventListener('click', () => {
      this.reset();
    });

    this.table.querySelector('thead').addEventListener('click', (e) => {
      if (e.target.closest('th')) {
        const th = e.target.closest('th');
        this.sort(th.dataset.sort, th.dataset.desc);
        th.dataset.desc = th.dataset.desc !== 'true';
      }
    });
  }

  createTable() {
    const tableWrap = document.createElement('div');
    tableWrap.classList.add('table_wrapper');
    this.table = document.createElement('table');
    this.table.classList.add('table');
    tableWrap.append(this.table);
    this.main.append(tableWrap);
    this.table.innerHTML = `
      <thead>
        <tr>
          <th data-sort="title" data-desc="true">Word</th>
          <th data-sort="train" data-desc="false">Train</th>
          <th data-sort="success" data-desc="false">Success</th>
          <th data-sort="error" data-desc="false">Errors</th>
        </tr>
      </thead>
    `;
    this.tbody = document.createElement('tbody');
  }

  outputStatistics() {
    this.tbody.innerHTML = '';
    Object.keys(this.statistics).forEach((key) => {
      const item = this.statistics[key];
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.title}(${item.translation})</td>
        <td>${item.train}</td>
        <td>${item.success}</td>
        <td>${item.error}</td>
      `;
      this.tbody.append(row);
    });
    this.table.append(this.tbody);
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

  addBtns() {
    const btns = document.createElement('div');
    btns.classList.add('btns');
    this.resetBtn = document.createElement('button');
    this.resetBtn.classList.add('stat_btn');
    this.resetBtn.innerText = 'Reset';
    this.gameDifficult = document.createElement('button');
    this.gameDifficult.classList.add('stat_btn');
    this.gameDifficult.innerText = 'Repeat difficult words';
    btns.append(this.gameDifficult);
    btns.append(this.resetBtn);
    this.main.append(btns);
  }

  reset() {
    this.statistics = false;
    this.create();
    this.outputStatistics();
  }

  sort(sorting, desc) {
    const sortStatistics = Object.keys(this.statistics)
      .sort((a, b) => {
        if (desc !== 'true') {
          return this.statistics[a][sorting] > this.statistics[b][sorting] ? -1 : 1;
        }
        return this.statistics[a][sorting] > this.statistics[b][sorting] ? 1 : -1;
      });
    const templateStatistics = {};
    sortStatistics.forEach((item) => {
      templateStatistics[item] = this.statistics[item];
    });
    this.statistics = templateStatistics;
    this.outputStatistics();
  }
}
