import Phaser from 'phaser';
import { CST } from '../CST';
import MenuScene from './MenuScene';
import GameScene from './GameScene';
import ResultScene from './ResultScene';

export default class LoadScene extends Phaser.Scene {
  constructor() {
    super({ key: CST.SCENES.LOAD });
  }

  loadImages() {
    this.load.setPath("assets/images");
    Object.keys(CST.IMAGES).forEach((key) => {
      this.load.image(CST.IMAGES[key], CST.IMAGES[key]);
    });
  }

  loadAudio() {
    this.load.setPath("assets/music");
    Object.keys(CST.MUSIC).forEach((key) => {
      this.load.audio(CST.MUSIC[key], CST.MUSIC[key]);
    });
  }

  loadSprites(frameConfig) {
    this.load.setPath("assets/sprites");
    Object.keys(CST.SPRITES).forEach((key) => {
      this.load.spritesheet(CST.SPRITES[key], CST.SPRITES[key], frameConfig);
    });
  }

  preload() {
    this.loadImages();
    this.loadAudio();
    this.loadSprites({
      frameHeight: 200,
      frameWidth: 128,
    });

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
    this.scene.add(CST.SCENES.GAME, GameScene, false);
    this.scene.add(CST.SCENES.RESULT, ResultScene, false);
  }
}
