import Phaser from 'phaser';
import { CST } from '../CST';
import { fontStyles } from '../config';

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: CST.SCENES.GAME });
  }

  create() {
    const { renderer } = this.game;

    this.add
      .text(
        renderer.width / 2,
        renderer.height * 0.50,
        'The game should start now',
        fontStyles,
      )
      .setOrigin(0.5);
  }
}
