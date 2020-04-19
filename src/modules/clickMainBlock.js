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
        return;
      }

      if (e.target.closest('.rotate')) {
        ClickMainBlock.rotateCard(e.target.closest('.rotate'));
        return;
      }

      if (e.target.closest('.front .card_img') && !document.body.classList.contains('game')) {
        const card = e.target.closest('.card');
        const sound = require(`../assets/sound/${card.dataset.name}.mp3`);
        this.audio.src = sound.default;
        this.audio.play();
      }
    });
  }

  static rotateCard(rotate) {
    const card = rotate.closest('.card');
    card.classList.add('flip');

    const leaveCard = () => {
      card.classList.remove('flip');
      card.removeEventListener('mouseleave', leaveCard);
    };

    card.addEventListener('mouseleave', leaveCard);
  }
}
