import Phaser from 'phaser';
import { CST } from '../CST';
import { fontStyles } from '../config';

function resetGame() {
  window.location.reload();
};

export default class ResultScene extends Phaser.Scene {
  constructor() {
    super({ key: CST.SCENES.RESULT });
  }

  init(data) {
    this.data = data || {
      finalScore: 0,
      totalByCoxinhaType: {
        coxinhas: 0,
        porcoxinhas: 0,
        patoxinhas: 0,
      },
    };
  }

  create() {
    this.keyEscape = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    this.canDoBetterSound = this.sound.add(CST.MUSIC.DO_BETTER, { volume: 0.6 });
    this.veryNiceSound = this.sound.add(CST.MUSIC.VERY_NICE, { volume: 0.6 });
    this.amazingSound = this.sound.add(CST.MUSIC.AMAZING, { volume: 0.6 });
    this.keyEscape.on('down', resetGame);

    this.renderResult();
  }

  renderResult() {
    this.playResultAudio();
    const { renderer } = this.game;

    this.add
      .text(
        renderer.width / 2,
        renderer.height * 0.3,
        `You scored ${this.data.finalScore}`,
        { ...fontStyles, font: "bold 70px Helvetica" }
      )
      .setOrigin(0.5);

    const coxinhasHeight = renderer.height * 0.6;

    this.add.image(renderer.width * 0.15, coxinhasHeight, CST.IMAGES.COXINHA)
      .setScale(0.6);
    this.add
      .text(
        renderer.width * 0.25,
        coxinhasHeight,
        this.data.totalByCoxinhaType.coxinhas,
        { ...fontStyles, font: "bold 70px Helvetica" }
      )
      .setOrigin(0.5);

    this.add.image(renderer.width * 0.45, coxinhasHeight, CST.IMAGES.PORCOXINHA)
      .setScale(0.6);
    this.add
      .text(
        renderer.width * 0.55,
        coxinhasHeight,
        this.data.totalByCoxinhaType.porcoxinhas,
        { ...fontStyles, font: "bold 70px Helvetica" }
      )
      .setOrigin(0.5);

    this.add.image(renderer.width * 0.75, coxinhasHeight, CST.IMAGES.PATOXINHA)
      .setScale(0.6);
    this.add
      .text(
        renderer.width * 0.85,
        coxinhasHeight,
        this.data.totalByCoxinhaType.patoxinhas,
        { ...fontStyles, font: "bold 70px Helvetica" }
      )
      .setOrigin(0.5);

    this.add
      .text(
        renderer.width / 2,
        renderer.height * 0.85,
        "Press ESC to try again",
        { ...fontStyles, font: "bold 30px Helvetica" }
      )
      .setOrigin(0.5);
  }

  playResultAudio() {
    const { renderer } = this.game;
    const { finalScore } = this.data;
    let message;

    if (finalScore >= 100) {
      message = "Look at that! That's amazing. Congratulations!";
      this.amazingSound.play();
    } else if (finalScore >= 60 && finalScore < 100) {
      message = "Very nice!";
      this.veryNiceSound.play();
    } else {
      message = "You can do better than this!";
      this.canDoBetterSound.play();
    }

    this.add
      .text(
        renderer.width / 2,
        renderer.height * 0.15,
        message,
        { ...fontStyles, font: "bold 20px Helvetica" }
      )
      .setOrigin(0.5);
  }
}

