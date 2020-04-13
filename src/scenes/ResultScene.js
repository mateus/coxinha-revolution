import Phaser from 'phaser';
import { CST } from '../CST';
import { fontStyles } from '../config';

export default class ResultScene extends Phaser.Scene {
  constructor() {
    super({ key: CST.SCENES.RESULT });
    this.resetGame = this.resetGame.bind(this);
  }

  init(data) {
    this.data = data;
  }

  create() {
    this.keyEscape = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    this.canDoBetterSound = this.sound.add(CST.MUSIC.DO_BETTER, { volume: 0.6 });
    this.veryNiceSound = this.sound.add(CST.MUSIC.VERY_NICE, { volume: 0.6 });
    this.amazingSound = this.sound.add(CST.MUSIC.AMAZING, { volume: 0.6 });
    this.keyEscape.on('down', this.resetGame);

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
    this.data.finalScore = 100;
    const { finalScore } = this.data;

    if (finalScore >= 100) {
      this.amazingSound.play();
    } else if (finalScore >= 60 && finalScore < 100) {
      this.veryNiceSound.play();
    } else {
      this.canDoBetterSound.play();
    }
  }

  resetGame() {
    // TODO properly restart the GAME scene
    this.scene.start(CST.SCENES.GAME);
  }
}
