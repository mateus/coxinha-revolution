import Phaser from 'phaser';
import { CST } from '../CST';
// import { fontStyles } from '../config';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: CST.SCENES.GAME });
  }

  create() {
    // const { renderer } = this.game;

    this.cameras.main.setBackgroundColor('#FFF');
  }
}
