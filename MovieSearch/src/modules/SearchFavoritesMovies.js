import Search from './search';
import Movie from './movie';

export default class SearchFavoritesMovies extends Search {
  loadDataMovie(dataSearch) {
    this.swiper.slideTo(0, 400);
    Promise.all(
      dataSearch
        .reduce((arrayPromises, dataMovie, i) => this
          .createMovie(arrayPromises, dataMovie, i),
        []),
    )
      .then(() => {
        if (this.swiper.slides.length > dataSearch.length) {
          this.removeSlides(dataSearch.length);
        }
        this.appendSlides(this.movies);
        this.loader.classList.remove('active');
      });
  }

  createMovie(arrayPromises, dataMovie, i) {
    const movie = new Movie(
      dataMovie,
      this.movies,
    );
    const moviePromise = this.swiper.slides[i]
      ? movie.edit(this.swiper.slides[i])
      : movie.create();
    arrayPromises.push(
      moviePromise,
    );
    return arrayPromises;
  }
}
