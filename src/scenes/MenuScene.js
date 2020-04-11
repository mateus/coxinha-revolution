import Phaser from 'phaser';
import { CST } from '../CST';
import { fontStyles } from '../config';
import { GameScene } from './GameScene';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: CST.SCENES.MENU });
  }

  create() {
    const { renderer } = this.game;

    this.add
      .text(
        renderer.width / 2,
        renderer.height * 0.30,
        'Coxinha Revolution',
        { ...fontStyles, font: "italic 48px Helvetica", fill: '#ddd' },
      )
      .setOrigin(0.5);

    const playButton = this.add
      .text(
        renderer.width / 2,
        renderer.height * 0.50,
        'Play',
        fontStyles,
      )
      .setOrigin(0.5)
      .setInteractive();

    playButton.on("pointerover", () => {
      playButton.setStyle({ fill: '#ccc' });
    })

    playButton.on("pointerout", () => {
      playButton.setStyle({ fill: '#fff' });
    })

    playButton.on("pointerup", () => {
      this.scene.add(CST.SCENES.GAME, GameScene, false)
      this.scene.start(CST.SCENES.GAME);
    })
  }
}
