import Phaser from 'phaser';
import coxinhaImg from './assets/coxinha.png';

const config = {
  type: Phaser.AUTO,
  parent: 'coxinha-revolution',
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    },
  },
  scene: {
    preload,
    create,
  },
};

const game = new Phaser.Game(config);

function preload() {
  this.load.image('coxinha', coxinhaImg);
}

function create() {
  const logo = this.add.image(400, 150, 'coxinha');

  this.tweens.add({
    targets: logo,
    y: 450,
    duration: 2000,
    ease: 'Power2',
    yoyo: true,
    loop: -1,
  });
}

function update() {

}
