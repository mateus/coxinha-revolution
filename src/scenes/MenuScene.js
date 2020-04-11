import Phaser from 'phaser';
import { CST } from '../CST';
import { fontStyles } from '../config';
import GameScene from './GameScene';

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: CST.SCENES.MENU });
  }

  create() {
    this.backgroundSound();
    this.renderBackgroundImage();
    this.renderGameTitle();
    const playButton = this.renderPlayButton();

    playButton.on("pointerover", () => {
      playButton.setStyle({ fill: '#f5f5f5' });
    });

    playButton.on("pointerout", () => {
      playButton.setStyle(fontStyles);
    });

    playButton.on("pointerup", () => {
      this.scene.add(CST.SCENES.GAME, GameScene, false);
      this.scene.start(CST.SCENES.GAME);
    });
  }

  renderGameTitle() {
    const { renderer } = this.game;

    return this.add
      .text(
        renderer.width / 2,
        renderer.height * 0.20,
        'Coxinha Revolution',
        { ...fontStyles, font: "bold 80px Helvetica", fill: '#ffa500' },
      )
      .setOrigin(0.5);
  }

  renderPlayButton() {
    const { renderer } = this.game;

    return this.add
      .text(
        renderer.width / 2,
        renderer.height * 0.40,
        'Play',
        fontStyles,
      )
      .setOrigin(0.5)
      .setInteractive();
  }

  renderBackgroundImage() {
    const { config } = this.game;

    return this.add.image(0, 0, CST.IMAGES.BACKGROUND)
      .setOrigin(0)
      .setDepth(0)
      .setDisplaySize(config.width, config.height);
  }

  backgroundSound(play = true) {
    this.sound.pauseOnBlur = false;

    if (play) {
      this.sound.play(CST.MUSIC.COXINHA_DE_FRANGO, { loop: true });
    }
  }
}
