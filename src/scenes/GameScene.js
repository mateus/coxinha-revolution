import Phaser from 'phaser';
import { CST } from '../CST';
import { fontStyles } from '../config';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: CST.SCENES.GAME });
    this.score = 0;
  }

  create() {
    this.renderBackgroundImage();
    this.renderScore();
  }

  renderScore() {
    const { renderer } = this.game;

    this.add
      .text(
        20,
        renderer.height - 50,
        `Coxinhas: ${this.score}`,
        { ...fontStyles, font: "30px Helvetica" },
      )
      .setOrigin(0);
  }

  renderBackgroundImage() {
    const { config } = this.game;

    return this.add.image(0, 0, CST.IMAGES.BACKGROUND)
      .setOrigin(0)
      .setDepth(0)
      .setDisplaySize(config.width, config.height);
  }
}
