import { unsplashAPI } from '@/constants';
import { fetchJSON } from '@/utils';

const generateBg = (img) => `linear-gradient(180deg, rgba(8, 15, 26, 0.59), rgba(17, 17, 46, 0.46)), url(${img}) center center / cover no-repeat fixed`;
const firstBg = document.querySelector('.firstBg');
const secondBg = document.querySelector('.secondBg');

const generateImage = (query) => {
  fetchJSON(`${unsplashAPI}${query}`)
    .then((data) => {
      new Promise((resolve) => {
        const img = new Image();
        img.src = data.urls.regular;
        img.onload = () => resolve(img.src);
        img.onerror = () => resolve();
      })
        .then((img) => {
          secondBg.style.background = generateBg(img);
          secondBg.classList.add('active');
          setTimeout(() => {
            firstBg.style.background = generateBg(img);
            secondBg.classList.remove('active');
          }, 600);
        });
    });
};

export default generateImage;
