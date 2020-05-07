import Swiper from 'swiper';
import { yandexTranslate, OMDb } from '../constants';
import noPoster from '../assets/img/noposter.png';
import Movie from './movie';

export default class Search {
  constructor() {
    this.page = 1;
    this.totalResults = 0;
    this.movies = [];
    this.loader = document.querySelector('.loader');
    this.search = '123';
    this.prompt = document.querySelector('.search_prompt');
  }

  init() {
    this.moviesPage();
    this.initSwiper();
    document.querySelector('.search_block')
      .addEventListener('submit', (e) => {
        this.submitForm(e);
      });
  }

  moviesPage() {
    this.loader.classList.add('active');
    this.movies = [];
    fetch(`${OMDb}&page=${this.page}&s=${this.search}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.Response === 'True') {
          this.totalResults = data.totalResults;
          Promise.all(
            data.Search
              .reduce((arrayPromises, dataMovie) => this.createMovie(arrayPromises, dataMovie), []),
          )
            .then(() => {
              this.swiper.appendSlide(this.movies);
              this.loader.classList.remove('active');
            });
        } else {
          this.errorOutput(data.Error);
        }
      });
  }

  createMovie(arrayPromises, dataMovie) {
    const movie = new Movie(
      dataMovie.Title,
      dataMovie.Poster,
      dataMovie.Year,
      dataMovie.imdbID,
      this.movies,
    );
    arrayPromises.push(movie.create());
    arrayPromises.push(
      new Promise((resolve) => {
        const img = new Image();
        img.src = dataMovie.Poster !== 'N/A' ? dataMovie.Poster : noPoster;
        img.onload = () => resolve();
      }),
    );
    return arrayPromises;
  }

  submitForm(e) {
    e.preventDefault();
    this.prompt.innerText = '';
    const form = e.target;
    const valueSearch = form.querySelector('.search_input').value;
    this.swiper.removeAllSlides();
    this.page = 1;
    this.search = valueSearch;
    if (this.isCyrillic()) {
      this.translate();
    } else {
      this.moviesPage();
    }
  }

  isCyrillic() {
    return /[а-я]/i.test(this.search);
  }

  translate() {
    fetch(`${yandexTranslate}&text=${this.search.trim()}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.search = data.text[data.text.length - 1];
        this.prompt.innerText = `Showing results for "${this.search}"`;
        this.moviesPage();
      });
  }

  initSwiper() {
    this.swiper = new Swiper('.swiper-container', {
      centerInsufficientSlides: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        500: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        800: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 50,
        },
      },
    });
    this.swiper.on('reachEnd', () => {
      this.nextPage();
    });
  }

  nextPage() {
    console.log(this.totalResults, this.totalResults / this.page);
    if (this.swiper.slides.length && this.totalResults / (this.page + 1) > 10) {
      this.page += 1;
      this.moviesPage();
    }
  }

  errorOutput(error) {
    if (error === 'Movie not found!') {
      this.prompt.innerText = `No results for "${this.search}"`;
    } else {
      this.prompt.innerText = error;
    }
  }
}
