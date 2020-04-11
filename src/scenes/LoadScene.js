import Phaser from 'phaser';
import { CST } from '../CST';
import MenuScene from './MenuScene';

export default class LoadScene extends Phaser.Scene {
  constructor() {
    super({ key: CST.SCENES.LOAD });
  }

  loadImages() {
    this.load.setPath("./assets/images");
    Object.keys(CST.IMAGES).forEach((key) => {
      this.load.audio(CST.IMAGES[key], CST.IMAGES[key]);
    });
  }

  loadAudio() {
    this.load.setPath("./assets/music");
    Object.keys(CST.MUSIC).forEach((key) => {
      this.load.audio(CST.MUSIC[key], CST.MUSIC[key]);
    });
  }

  preload() {
    this.loadImages();
    this.loadAudio();

    const { renderer } = this.game;

    const loadingBar = this.add.graphics({
      fillStyle: {
        color: 0xffffff,
      }
    });

    this.load.on('progress', (percent) => {
      loadingBar.fillRect(0, renderer.height / 2, renderer.width * percent, 50);
    });

    this.load.on('complete', () => {
      this.scene.start(CST.SCENES.MENU);
    });
  }

  create() {
    this.scene.add(CST.SCENES.MENU, MenuScene, false);
  }
}
