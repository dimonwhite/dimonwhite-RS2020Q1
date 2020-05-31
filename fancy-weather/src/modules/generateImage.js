import { unsplashAPI } from '@/constants';
import { fetchJSON } from '@/utils';

const generateImage = (query) => {
  fetchJSON(`${unsplashAPI}${query}`)
    .then((data) => {
      document.body.style.background = `linear-gradient(180deg, rgba(8, 15, 26, 0.59), rgba(17, 17, 46, 0.46)), url(${data.urls.regular}) center center /cover no-repeat fixed`;
    });
};

export default generateImage;
