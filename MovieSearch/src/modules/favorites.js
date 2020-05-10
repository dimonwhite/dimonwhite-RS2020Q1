export default class Favorites {
  constructor(swiper) {
    this.favorites = localStorage.getItem('favorites')
      ? JSON.parse(localStorage.getItem('favorites'))
      : {};
    this.swiper = swiper;
  }

  init() {
    const moviesBlock = document.querySelector('.movies');
    moviesBlock.addEventListener('click', (e) => {
      this.clickFavorites(e);
    });
  }

  clickFavorites(e) {
    const favoritesBtn = e.target.closest('.favorites');
    if (favoritesBtn) {
      this.toggleFavorites(favoritesBtn);
    }
  }

  toggleFavorites(favoritesBtn) {
    const { id } = favoritesBtn.dataset;
    favoritesBtn.classList.toggle('active');
    if (this.favorites[id]) {
      delete this.favorites[id];
    } else {
      this.favorites[id] = id;
    }
    console.log(this.favorites);
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }
}
