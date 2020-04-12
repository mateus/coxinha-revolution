import Phaser from 'phaser';
import { CST } from '../CST';
import { fontStyles } from '../config';

function getRandomInt(min, max) {
  const minVal = Math.ceil(min);
  const maxVal = Math.floor(max);
  return Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
}

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: CST.SCENES.GAME });
    this.score = 0;
    this.totalByCoxinhaType = {
      coxinhas: 0,
      porcoxinhas: 0,
      patoxinhas: 0,
    };
    this.isPatoxinha = false;
    this.isPorcoxinha = false;
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
        renderer.height - 10,
        this.score,
        { ...fontStyles, font: "70px Helvetica" },
      )
      .setOrigin(0, 1);
  }

  setNextCoxinha() {
    const coxinhaLevel = getRandomInt(0, 2);
    switch (coxinhaLevel) {
      case 1:
        this.isPorcoxinha = true;
        this.isPatoxinha = false;
        break;
      case 2:
        this.isPatoxinha = true;
        this.isPorcoxinha = false;
        break;
      default:
        this.isPorcoxinha = false;
        this.isPatoxinha = false;
        break;
    }
  }

  getNextCoxinhaValues() {
    this.setNextCoxinha();
    if (this.isPatoxinha) {
      return {
        image: CST.IMAGES.PATOXINHA,
        duration: 1300,
      };
    }
    if (this.isPorcoxinha) {
      return {
        image: CST.IMAGES.PORCOXINHA,
        duration: 1600,
      };
    }
    return {
      image: CST.IMAGES.COXINHA,
      duration: 2000,
    };
  }

  renderFlyingCoxinha() {
    // console.log(this.totalByCoxinhaType);
    const { renderer } = this.game;
    const { image, duration } = this.getNextCoxinhaValues();

    this.coxinha = this.add.image(0, getRandomInt(50, renderer.height - 50), image)
      .setAngle(45)
      .setScale(0.5);

    this.tweens.add({
      targets: this.coxinha,
      duration,
      rotation: 10,
      x: renderer.width + 100,
      y: getRandomInt(50, renderer.height - 50),
      ease: 'Cubic',
      repeat: -1,
      delay: 300,
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

    if (coxinhaPosition.x >= renderer.width - 150) {
      // might be able to eat
      if (coxinhaPosition.y + 80 >= playerPosition.y && coxinhaPosition.y - 80 <= playerPosition.y) {
        // should eat
        this.music.play();
        this.updateScore();
        this.renderFlyingCoxinha();
      }
    }
  }

  updateScore() {
    let incrementBy;

    if (this.isPatoxinha) {
      this.totalByCoxinhaType.patoxinhas += 1;
      incrementBy = 3;
    } else if (this.isPorcoxinha) {
      this.totalByCoxinhaType.porcoxinhas += 1;
      incrementBy = 2;
    } else {
      this.totalByCoxinhaType.coxinhas += 1;
      incrementBy = 1;
    }

    this.score += incrementBy;
    this.scoreText.setText(this.score);
    this.coxinha.destroy();
  }

  updatePlayerPosition() {
    const { up, down } = this.cursors;
    const { renderer } = this.game;
    const currentPlayerPosition = this.player.y;
    const speed = 15;

    if (up.isDown && currentPlayerPosition > -100) {
      this.player.setY(currentPlayerPosition - speed);
    } else if (down.isDown && (currentPlayerPosition + this.player.height) < renderer.height) {
      this.player.setY(currentPlayerPosition + speed);
    }
  }
}
