import Phaser from 'phaser';

export const config = {
  type: Phaser.AUTO,
  parent: 'coxinha-revolution',
  width: 1024,
  height: 768,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    },
  },
  render: {
    pixelArt: true
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
};

export const fontStyles = { font: "bold 38px Helvetica", fill: "#fff" };
