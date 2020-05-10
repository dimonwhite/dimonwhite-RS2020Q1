import SearchFavoritesMovies from './SearchFavoritesMovies';

export default class Favorites {
  constructor(swiper) {
    this.favorites = localStorage.getItem('favorites')
      ? JSON.parse(localStorage.getItem('favorites'))
      : {};
    this.swiper = swiper;
    this.moviesBlock = document.querySelector('.movies');
    this.searchForm = document.querySelector('.search_block');
    this.prompt = document.querySelector('.search_prompt');
  }

  init() {
    const moviesBlock = document.querySelector('.movies');
    moviesBlock.addEventListener('click', (e) => {
      this.clickFavoriteBtn(e);
    });
    document.querySelector('.link.favorites_link')
      .addEventListener('click', (e) => {
        this.clickFavoritesLink(e);
      });
  }

  clickFavoritesLink(e) {
    e.preventDefault();
    const favoritesLink = e.target.closest('.favorites_link');
    if (favoritesLink) {
      this.initFavoritesMovies();
    }
  }

  initFavoritesMovies() {
    const favoritesIds = Object.keys(this.favorites);
    if (favoritesIds.length) {
      this.prompt.innerText = '';
      this.searchForm.reset();
      this.moviesBlock.classList.add('favorites');
      const searchFavorites = new SearchFavoritesMovies(this.swiper);
      searchFavorites.loadDataMovie(favoritesIds);
    } else {
      this.prompt.innerText = 'Favorites movies not found';
    }
  }

  clickFavoriteBtn(e) {
    const favoriteBtn = e.target.closest('.favorites');
    if (favoriteBtn) {
      this.changeFavorite(favoriteBtn);
    }
  }

  changeFavorite(favoriteBtn) {
    const { id } = favoriteBtn.dataset;
    favoriteBtn.classList.toggle('active');
    if (this.favorites[id]) {
      delete this.favorites[id];
    } else {
      this.favorites[id] = id;
    }
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }
}
