import Phaser from 'phaser';
import { CST } from '../CST';
import { fontStyles } from '../config';
import GameScene from './GameScene';

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: CST.SCENES.MENU });
    this.musicPlaying = true;
  }

  create() {
    this.renderBackgroundImage();
    this.renderPeekingCoxinha();
    this.renderFlyingPatoxinha();
    this.renderGameTitle();
    this.renderFootnote();
    this.renderMusicButton();
    this.renderPlayButton();
  }

  renderGameTitle() {
    const { renderer } = this.game;

    const gameTitle = this.add
      .text(
        renderer.width / 2,
        renderer.height * 0.25,
        'Coxinha Revolution',
        { ...fontStyles, font: "bold 80px Helvetica" }
      )
      .setOrigin(0.5);

    this.tweens.add({
      targets: gameTitle,
      scale: 1.08,
      angle: 4,
      duration: 400,
      ease: 'Bounce',
      yoyo: true,
      repeat: -1,
      repeatDelay: 3000,
    });
  }

  renderMusicButton() {
    const { renderer } = this.game;

    this.sound.pauseOnBlur = false;
    this.music = this.sound.add(CST.MUSIC.COXINHA_DE_FRANGO, { loop: true });
    this.music.play();

    const musicButton = this.add
      .text(
        70,
        renderer.height - 35,
        `Music: ${this.musicPlaying ? 'on' : 'off'}`,
        { ...fontStyles, font: "bold 20px Helvetica" }
      )
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    musicButton
      .on("pointerover", () => {
        musicButton.setScale(1.05);
      })
      .on("pointerout", () => {
        musicButton.setScale(1);
      })
      .on("pointerup", () => {
        if (this.musicPlaying) {
          this.music.pause();
        } else {
          this.music.resume();
        }
        this.musicPlaying = !this.musicPlaying;
        musicButton.setText(`Music: ${this.musicPlaying ? 'on' : 'off'}`);
      });
  }

  renderPlayButton() {
    const { renderer } = this.game;

    const playButton = this.add
      .text(
        renderer.width / 2,
        renderer.height - 110,
        'Play',
        fontStyles,
      )
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    playButton
      .on("pointerover", () => {
        playButton.setScale(1.05);
      })
      .on("pointerout", () => {
        playButton.setScale(1);
      })
      .on("pointerup", () => {
        this.scene.add(CST.SCENES.GAME, GameScene, false);
        this.scene.start(CST.SCENES.GAME);
      });
  }

  renderBackgroundImage() {
    const { config } = this.game;

    this.add.image(0, 0, CST.IMAGES.BACKGROUND)
      .setOrigin(0)
      .setDepth(0)
      .setDisplaySize(config.width, config.height);
  }

  renderPeekingCoxinha() {
    const coxinha = this.add.image(30, 20, CST.IMAGES.COXINHA)
      .setOrigin(0)
      .setAngle(45);

    this.tweens.add({
      targets: coxinha,
      duration: 400,
      x: 35,
      y: 15,
      ease: 'Bounce',
      yoyo: true,
      repeat: -1,
      repeatDelay: 3000,
      delay: 2000,
    });
  }

  renderFlyingPatoxinha() {
    const { renderer } = this.game;
    const patoxinha = this.add.image(-200, 500, CST.IMAGES.PATOXINHA)
      .setAngle(45);

    this.tweens.add({
      targets: patoxinha,
      duration: 4000,
      rotation: 20,
      x: renderer.width + 500,
      y: 400,
      ease: 'Cubic',
      repeat: -1,
      repeatDelay: 5000,
      delay: 2500,
    });
  }

  renderFootnote() {
    const { renderer } = this.game;

    this.add
      .text(
        renderer.width - 80,
        renderer.height - 22,
        'Made with ❤️ by Mateus Ferreira',
        { ...fontStyles, font: "18px Helvetica", fill: '#f5f5f5' },
      )
      .setOrigin(1);
    this.add
      .image(
        renderer.width - 20,
        renderer.height - 20,
        CST.IMAGES.MATEUSKAWAII,
      )
      .setOrigin(1);
  }
}
