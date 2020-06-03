export default class ImageWeather {
  constructor() {
    this.icon01 = ['sun'];
    this.icon02 = ['cloud', 'sun'];
    this.icon03 = ['cloud'];
    this.icon04 = ['cloud', 'darkcloud'];
    this.icon09 = ['cloud', 'darkcloud', 'drop', 'drop', 'drop'];
    this.icon10 = ['cloud', 'sun', 'drop', 'drop', 'drop'];
    this.icon11 = ['cloud', 'darkcloud', 'lightning'];
    this.icon13 = ['cloud', 'snow', 'snow', 'snow'];
    this.icon50 = ['cloud', 'line', 'line', 'line', 'line'];
  }

  generateImg(name) {
    return this[name].reduce((acc, svg) => acc + ImageWeather.generateSvg(svg), '');
  }

  static generateSvg(name) {
    return `
      <svg class="svg_icon ${name}">
          <use xlink:href="sprite.svg#${name}"></use>
      </svg>
    `;
  }
}
