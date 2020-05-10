import { yandexTranslate, OMDb } from '../constants';
import noPoster from '../assets/img/noposter.png';
import Movie from './movie';
import fetchJSON from '../utils';

export default class Search {
  constructor(swiper) {
    this.swiper = swiper;
    this.page = 1;
    this.totalResults = 0;
    this.movies = [];
    this.loader = document.querySelector('.loader');
    this.search = 'transformers';
    this.prompt = document.querySelector('.search_prompt');
    this.moviesBlock = document.querySelector('.movies');
    this.residue = 0;
  }

  init() {
    this.loadMoviesPage(this.search, true);
    this.swiper.on('reachEnd', () => {
      if (!this.moviesBlock.classList.contains('favorites')) {
        this.nextPage();
      }
    });
    document.querySelector('.search_block')
      .addEventListener('submit', (e) => {
        this.submitForm(e);
      });
  }

  loadMoviesPage(search, firstRequest) {
    this.loader.classList.add('active');
    this.movies = [];
    fetchJSON(`${OMDb}&page=${this.page}&s=${search}`)
      .then((data) => {
        if (data.Response === 'True') {
          this.loadDataMovie(data.Search, data.totalResults, search, firstRequest);
        } else {
          this.errorOutput(data.Error, search);
        }
      });
  }

  loadDataMovie(dataSearch, dataTotalResults, search, firstRequest) {
    this.search = search;
    this.residue = dataTotalResults;
    this.totalResults = dataTotalResults;
    if (!firstRequest && this.page === 1) {
      this.swiper.slideTo(0, 400);
    }
    Promise.all(
      dataSearch
        .reduce((arrayPromises, dataMovie, i) => this
          .createMovie(arrayPromises, dataMovie, i),
        []),
    )
      .then(() => {
        if (this.isRemoveSlides(firstRequest, dataSearch.length)) {
          this.removeSlides(dataSearch.length);
        }
        this.appendSlides(this.movies);
        this.loader.classList.remove('active');
      });
  }

  isRemoveSlides(firstRequest, dataSearchLength) {
    return !firstRequest && this.page === 1 && this.swiper.slides.length > dataSearchLength;
  }

  appendSlides(movies) {
    const arrayMovies = [];
    movies
      .sort((item) => (typeof item === 'string' ? 1 : -1))
      .forEach((item, i) => {
        if (typeof item === 'string') {
          arrayMovies.push(item);
        } else {
          item.editHTML(this.swiper.slides[i]);
        }
      });
    this.swiper.appendSlide(arrayMovies);
  }

  removeSlides(movieLength) {
    const positionsRemoveSlide = [];
    for (let i = movieLength; i < this.swiper.slides.length; i += 1) {
      positionsRemoveSlide.push(i);
    }
    this.swiper.removeSlide(positionsRemoveSlide);
  }

  createMovie(arrayPromises, dataMovie, i) {
    const movie = new Movie(
      dataMovie.imdbID,
      this.movies,
    );
    const moviePromise = this.swiper.slides[i] && this.page === 1
      ? movie.edit(this.swiper.slides[i])
      : movie.create();
    arrayPromises.push(
      moviePromise,
      new Promise((resolve) => {
        const img = new Image();
        img.src = dataMovie.Poster !== 'N/A' ? dataMovie.Poster : noPoster;
        img.onload = () => resolve();
        img.onerror = () => resolve();
      }),
    );
    return arrayPromises;
  }

  submitForm(e) {
    e.preventDefault();
    this.prompt.innerText = '';
    this.moviesBlock.classList.remove('favorites');
    const form = e.target;
    const valueSearch = form.querySelector('.search_input').value;
    this.page = 1;
    if (Search.isCyrillic(valueSearch)) {
      this.translate(valueSearch);
    } else {
      this.loadMoviesPage(valueSearch);
    }
  }

  static isCyrillic(valueSearch) {
    return /[а-я]/i.test(valueSearch);
  }

  translate(valueSearch) {
    fetch(`${yandexTranslate}&text=${valueSearch.trim()}`)
      .then((response) => response.json())
      .then((data) => {
        const valueSearchTranslate = data.text[data.text.length - 1];
        this.prompt.innerText = `Showing results for "${valueSearchTranslate}"`;
        this.loadMoviesPage(valueSearchTranslate);
      });
  }

  nextPage() {
    if (this.residue > this.swiper.slides.length) {
      this.page += 1;
      this.loadMoviesPage(this.search);
    }
  }

  errorOutput(error, search) {
    if (error === 'Movie not found!') {
      this.prompt.innerText = `No results for "${search}"`;
    } else {
      this.prompt.innerText = error;
    }
    this.loader.classList.remove('active');
  }
}
