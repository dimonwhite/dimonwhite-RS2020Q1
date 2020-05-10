const yandexTranslateKey = 'trnsl.1.1.20200505T142755Z.3342ddafcd82c08d.0a13b6258a97b8ffb5047c64c96a94cc21cd8f37';
const OMDbKey = '520ae400';
const imdbLink = '//www.imdb.com/title/';

const yandexTranslate = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${yandexTranslateKey}&lang=ru-en&text=`;
const OMDb = `//www.omdbapi.com/?apikey=${OMDbKey}&type=movie`;
export { yandexTranslate, OMDb, imdbLink };
