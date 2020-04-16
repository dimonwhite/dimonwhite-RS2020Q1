import GoToPage from '@modules/gotopage';

export default class ClickMainBlock {
  constructor(mainBlock) {
    this.main = mainBlock;
    this.audio = new Audio();
  }

  init() {
    this.main.addEventListener('click', (e) => {
      if (e.target.closest('.category_card')) {
        e.preventDefault();
        const goToPage = new GoToPage(e.target.closest('.category_card'));
        goToPage.go();
      }
      if (e.target.closest('.rotate')) {
        ClickMainBlock.rotateCard(e.target.closest('.rotate'));
      }
      if (e.target.closest('.card_img')) {
        const card = e.target.closest('.card');
        const sound = require(`../assets/sound/${card.dataset.name}.mp3`);
        this.audio.src = sound.default;
        this.audio.autoplay = true;
      }
    });
  }

  static rotateCard(rotate) {
    const card = rotate.closest('.card');
    card.classList.add('rotate');

    const leaveCard = () => {
      card.classList.remove('rotate');
      card.removeEventListener('mouseleave', leaveCard);
    };

    card.addEventListener('mouseleave', leaveCard);
  }
}
