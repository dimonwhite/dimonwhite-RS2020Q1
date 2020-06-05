import { unsplashAPI } from '@/constants';
import { fetchJSON } from '@/utils';

export default class ImageBg {
  constructor(error, time) {
    this.error = error;
    this.time = time || 600;
    this.firstBg = document.querySelector('.firstBg');
    this.secondBg = document.querySelector('.secondBg');
  }

  generateBg() {
    return `linear-gradient(180deg, rgba(8, 15, 26, 0.59), rgba(17, 17, 46, 0.46)), url(${this.img}) center center / cover no-repeat fixed`;
  }

  getImage(query) {
    fetchJSON(`${unsplashAPI}${query}`)
      .then((data) => {
        this.img = data.urls.regular;
        this.generateImage();
      })
      .catch(() => {
        this.error.showPopup('errorImg');
      });
  }

  waitImage() {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = this.img;
      img.onload = () => resolve(img.src);
      img.onerror = () => resolve();
    });
  }

  generateImage() {
    this.waitImage()
      .then((img) => {
        if (img) {
          this.secondBg.style.background = this.generateBg(img);
          this.secondBg.classList.add('active');
          setTimeout(() => {
            this.firstBg.style.background = this.generateBg(img);
            this.secondBg.classList.remove('active');
          }, this.time);
        }
      });
  }
}
