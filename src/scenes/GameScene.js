import Phaser from 'phaser';
import { CST } from '../CST';
import { fontStyles } from '../config';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: CST.SCENES.GAME });
    this.score = 0;
    this.eatCoxinha = this.eatCoxinha.bind(this);
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE, { volume: 1 });
    this.music = this.sound.add(CST.MUSIC.EAT);

    this.renderBackgroundImage();
    this.renderPlayer();
    this.renderFlyingCoxinha();
    this.renderScore();
  }

  update() {
    this.updatePlayerPosition();
    // this.eatCoxinha();
  }

  renderPlayer() {
    const { renderer } = this.game;

    this.player = this.add.sprite(renderer.width - 30, 0, CST.SPRITES.PLAYER, 1)
      .setOrigin(1, 0)
      .setAngle(-30);

    this.anims.create({
      key: 'eat',
      frames: this.anims.generateFrameNames(CST.SPRITES.PLAYER, { start: 0, end: 1 }),
      duration: 200,
    });

    this.keySpace.on('down', this.eatCoxinha);
  }

  renderScore() {
    const { renderer } = this.game;

    this.scoreText = this.add
      .text(
        20,
        renderer.height - 50,
        `Coxinhas: ${this.score}`,
        { ...fontStyles, font: "30px Helvetica" },
      )
      .setOrigin(0);
  }

  renderFlyingCoxinha() {
    const { renderer } = this.game;
    const image = this.score < 2 ? CST.IMAGES.COXINHA : CST.IMAGES.PATOXINHA;

    this.coxinha = this.add.image(-200, 500, image)
      .setAngle(45)
      .setScale(0.5);

    this.tweens.add({
      targets: this.coxinha,
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

  renderBackgroundImage() {
    const { config } = this.game;

    return this.add.image(0, 0, CST.IMAGES.BACKGROUND)
      .setOrigin(0)
      .setDepth(0)
      .setDisplaySize(config.width, config.height);
  }

  eatCoxinha() {
    this.player.play('eat');

    const { renderer } = this.game;
    const playerPosition = this.player.getLeftCenter();
    const coxinhaPosition = this.coxinha.getRightCenter();

    if (coxinhaPosition.x >= renderer.width) return;
    if (coxinhaPosition.x >= renderer.width - 100) {
      // console.log('Might be able to eat');
      if (coxinhaPosition.y >= playerPosition.y && coxinhaPosition.y - 80 <= playerPosition.y) {
        // console.log('We should eat');
        this.music.play();
        this.updateScore();
        this.renderFlyingCoxinha();
      }
    }
  }

  updateScore() {
    this.score += 1;
    this.scoreText.setText(`Coxinhas: ${this.score}`);
    this.coxinha.destroy();
  }

  updatePlayerPosition() {
    const { up, down } = this.cursors;
    const { renderer } = this.game;
    const currentPlayerPosition = this.player.y;
    const speed = 10;

    if (up.isDown && currentPlayerPosition > 0) {
      this.player.setY(currentPlayerPosition - speed);
    } else if (down.isDown && (currentPlayerPosition + this.player.height) < renderer.height) {
      this.player.setY(currentPlayerPosition + speed);
    }
  }
}
