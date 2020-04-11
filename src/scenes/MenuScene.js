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
    this.renderGameTitle();
    this.renderFootnote();
    this.renderMusicButton();
    this.renderPlayButton();
  }

  renderGameTitle() {
    const { renderer } = this.game;

    this.gameTitle = this.add
      .text(
        renderer.width / 2,
        renderer.height * 0.25,
        'Coxinha Revolution',
        { ...fontStyles, font: "bold 80px Helvetica" }
      )
      .setOrigin(0.5);

    this.tweens.add({
      targets: this.gameTitle,
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

    this.playButton = this.add
      .text(
        renderer.width / 2,
        renderer.height - 110,
        'Play',
        fontStyles,
      )
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    this.playButton
      .on("pointerover", () => {
        this.playButton.setScale(1.05);
      })
      .on("pointerout", () => {
        this.playButton.setScale(1);
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
