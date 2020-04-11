import Phaser from 'phaser';
import { CST } from '../CST';
import { MenuScene } from './MenuScene';

export class LoadScene extends Phaser.Scene {
  constructor() {
    super({ key: CST.SCENES.LOAD });
  }

  loadImages() {
    this.load.setPath("./assets/images");

    for (let prop in CST.IMAGES) {
      this.load.image(CST.IMAGES[prop], CST.IMAGES[prop])
    }
  }

  loadAudio() {
    this.load.setPath("./assets/music");

    for (let prop in CST.MUSIC) {
      this.load.audio(CST.MUSIC[prop], CST.MUSIC[prop]);
    }
  }

  preload() {
    this.loadImages();
    this.loadAudio();

    const { renderer } = this.game;

    let loadingBar = this.add.graphics({
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
    this.scene.add(CST.SCENES.MENU, MenuScene, false)
  }
}
