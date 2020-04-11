import Phaser from 'phaser';
import { config } from './config';
import { CST } from './CST';
import { LoadScene } from './scenes/LoadScene';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add(CST.SCENES.LOAD, LoadScene, true);
  }
}

window.onload = () => {
  window.game = new Game();
}
