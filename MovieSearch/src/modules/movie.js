import { OMDb, imdbLink } from '../constants';
import noPoster from '../assets/img/noposter.png';
import fetchJSON from '../utils';

export default class Movie {
  constructor(imdbID, movies) {
    this.imdbID = imdbID;
    this.movies = movies;
    this.favorites = localStorage.getItem('favorites')
      ? JSON.parse(localStorage.getItem('favorites'))
      : {};
  }

  constructorMovie(data) {
    this.title = data.Title;
    this.img = data.Poster;
    this.year = data.Year;
    this.rating = data.imdbRating;
  }

  create() {
    return fetchJSON(`${OMDb}&i=${this.imdbID}`)
      .then((data) => {
        this.constructorMovie(data);
        this.movies.push(this.createHTML());
      });
  }

  createHTML() {
    return `
      <div class="swiper-slide">
        <div class="movie">
          <div class="movie_img">
            <img src="" alt="${this.title}" class="img back">
            <img src="${this.img !== 'N/A' ? this.img : noPoster}" alt="${this.title}" class="img front">
          </div>
          <div class="movie_info">
            <div class="movie_year">${this.year}</div>
            <div class="movie_rating">
              <svg class="svg_icon">
                <use xlink:href="sprite.svg#star"></use>
              </svg>
              <span class="movie_rating_text">${this.rating}</span>
            </div>
          </div>
          <a href="${imdbLink}${this.imdbID}/videogallery/" target="_blank" class="movie_title">${this.title}</a>
          <div class="movie_bottom">
            <a href="${imdbLink}${this.imdbID}" target="_blank" class="link main_link">
              <svg class="svg_icon">
                <use xlink:href="sprite.svg#movie"></use>
              </svg>
            </a>
            <svg class="svg_icon favorites${this.favorites[this.imdbID] ? ' active' : ''}" data-id="${this.imdbID}">
              <use xlink:href="sprite.svg#heart"></use>
            </svg>
            <a href="${imdbLink}${this.imdbID}/mediaindex" target="_blank" class="link photo_gallery">
              <svg class="svg_icon">
                <use xlink:href="sprite.svg#photo"></use>
              </svg>
            </a>
          </div>
        </div>
      </div>
    `;
  }

  edit() {
    return fetchJSON(`${OMDb}&i=${this.imdbID}`)
      .then((data) => {
        this.constructorMovie(data);
        this.movies.push(this);
      });
  }

  editHTML(slide) {
    const newSlide = slide;
    newSlide.querySelector('.movie_year').innerText = this.year;
    newSlide.querySelector('.movie_rating_text').innerText = this.rating;
    newSlide.querySelector('.movie_title').innerText = this.title;
    newSlide.querySelector('.movie_title').href = `${imdbLink}${this.imdbID}/videogallery/`;
    newSlide.querySelector('.link.main_link').href = `${imdbLink}${this.imdbID}`;
    newSlide.querySelector('.link.photo_gallery').href = `${imdbLink}${this.imdbID}/mediaindex`;
    this.changeImage(newSlide.querySelector('.movie_img'));
    this.checkFavorites(newSlide.querySelector('.favorites'));
  }

  changeImage(imageBlock) {
    const backImage = imageBlock.querySelector('.back');
    const frontImage = imageBlock.querySelector('.front');
    backImage.src = this.img !== 'N/A' ? this.img : noPoster;
    backImage.classList.add('front');
    backImage.classList.remove('back');
    frontImage.classList.add('back');
    frontImage.classList.remove('front');
  }

  checkFavorites(btn) {
    const favoritesBtn = btn;
    favoritesBtn.dataset.id = this.imdbID;
    favoritesBtn.classList.remove('active');
    if (this.favorites[this.imdbID]) {
      favoritesBtn.classList.add('active');
    }
  }
}
