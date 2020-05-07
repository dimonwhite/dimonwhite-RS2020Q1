import { OMDb } from '../constants';
import noPoster from '../assets/img/noposter.png';

export default class Movie {
  constructor(title, img, year, imdbID, movies) {
    this.title = title;
    this.img = img;
    this.year = year;
    this.imdbID = imdbID;
    this.movies = movies;
  }

  create() {
    return fetch(`${OMDb}&i=${this.imdbID}`)
      .then((response) => response.json())
      .then((data) => {
        const rating = data.imdbRating;
        console.log(data);
        this.movies.push(`
          <div class="swiper-slide">
            <div class="movie">
              <img src="${this.img !== 'N/A' ? this.img : noPoster}" alt="${this.title}" class="movie_img">
              <div class="movie_info">
                <div class="movie_year">${this.year}</div>
                <div class="movie_rating">
                  <svg class="svg_icon">
                    <use xlink:href="sprite.svg#star"></use>
                  </svg>
                  <span class="movie_rating_text">${rating}</span>
                </div>
              </div>
              <a href="//www.imdb.com/title/${this.imdbID}" target="_blank" class="movie_title">${this.title}</a>
              <div class="movie_bottom">
                <a href="//www.imdb.com/title/${this.imdbID}/videogallery/" target="_blank" class="link">
                  <svg class="svg_icon">
                    <use xlink:href="sprite.svg#video"></use>
                  </svg>
                </a>
                <svg class="svg_icon favorites" data-id="${this.imdbID}">
                  <use xlink:href="sprite.svg#heart"></use>
                </svg>
                <a href="//www.imdb.com/title/${this.imdbID}/mediaindex" target="_blank" class="link">
                  <svg class="svg_icon">
                    <use xlink:href="sprite.svg#photo"></use>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        `);
      });
  }
}
