import Phaser from 'phaser';
import { CST } from '../CST';
// import { fontStyles } from '../config';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: CST.SCENES.GAME });
  }

  create() {
    this.renderBackgroundImage();
  }

  renderBackgroundImage() {
    const { config } = this.game;

    return this.add.image(0, 0, CST.IMAGES.BACKGROUND)
      .setOrigin(0)
      .setDepth(0)
      .setDisplaySize(config.width, config.height);
  }
}
