import Phaser from 'phaser';
import { CST } from '../CST';

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: CST.SCENES.GAME });
  }

  init() {
    console.log('Hello from GAME')
  }

  create() {
    const coxinha = this.add.image(400, 150, 'coxinha');
  }
}
