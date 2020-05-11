import Movie from "../src/modules/movie";
const requestMovie = (imdbID) => new Movie(imdbID).requestMovie();

describe('Request Movie', () => {
  test('should return dataArray', () => {
    return requestMovie('tt1399103').then(data => {
      const testData = [
        data.Title,
        data.Year,
        data.Released,
        data.Director
      ];
      const resultData = [
        'Transformers: Dark of the Moon',
        '2011',
        '29 Jun 2011',
        'Michael Bay'
      ];
      expect(testData).toEqual(resultData);
    });
  });

  test('should return error "Incorrect IMDb ID"', () => {
    return requestMovie('123').then(data => {
      const resultError = {"Response":"False","Error":"Incorrect IMDb ID."};
      expect(data).toEqual(resultError);
    });
  });
});