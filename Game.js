import { Canvas } from './Canvas.js';
import { Ball } from './Ball.js';
import { Stick } from './Stick.js';
import { Control } from './Control.js';
import { Hud } from './Hud.js';

export class Game {
  canvas;
  ball;
  playerOne;
  playerTwo;
  control;

  playerOneScore = 0;
  playerTwoScore = 0;
  enterToPlay;

  timer = 0;
  waiting = false;
  playing = false;

  constructor() {
    this.loop = this.loop.bind(this);
    this.canvas = new Canvas();

    this.control = new Control();

    this.goalsPlayerOne = new Hud(this.canvas);
    this.goalsPlayerOne.setPosition(this.canvas.snapToGrid({ x: 24, y: 4 }));
    this.goalsPlayerTwo = new Hud(this.canvas);
    this.goalsPlayerTwo.setPosition(this.canvas.snapToGrid({ x: 40, y: 4 }));
    this.enterToPlay = new Hud(this.canvas);
    this.enterToPlay.setPosition(this.canvas.snapToGrid({ x: 32, y: 30 }))
    this.enterToPlay.setValue("Press enter to play");

    this.ball = new Ball(this.canvas);

    this.playerOne = new Stick(this.canvas);
    this.playerTwo = new Stick(this.canvas, false);

    this.startGame();

    window.requestAnimationFrame(this.loop);

  }

  loop(timestamp) {
    let delta = timestamp - this.lastRender;

    if (!this.waiting)
      this.handleEvents();
    this.update(delta);
    this.draw();

    this.lastRender = timestamp;
    window.requestAnimationFrame(this.loop);

  }

  startGame() {
    this.playerOneScore = this.playerTwoScore = 0;
  }

  update(delta) {
    if (this.playing) {
      if (!this.isWaiting()) {
        this.ball.update(delta);
        this.playerOne.update(delta);
        this.playerTwo.update(delta);
        this.handleCollisions();

        this.handleGoals();
      }
    }

  }

  handleCollisions() {
    if (this.playerOne.isColliding(this.ball.getCollisionBox())) this.ball.bounce();
    if (this.playerTwo.isColliding(this.ball.getCollisionBox())) this.ball.bounce();
  }

  handleGoals() {
    if (this.ball.isPlayerOneGoal()) {
      this.ball.resetPosition();
      this.ball.bounce();
      this.playerOneScore++;
      this.wait();
    }

    if (this.ball.isPlayerTwoGoal()) {
      this.ball.bounce();
      this.ball.resetPosition();
      this.playerTwoScore++;
      this.wait();
    }

    this.goalsPlayerOne.setValue(this.playerOneScore);
    this.goalsPlayerTwo.setValue(this.playerTwoScore);
  }

  handleEvents() {
    if (this.control.getActions().playerOneDown && !this.control.getActions().playerOneUp) this.playerOne.move('DOWN')
    else if (this.control.getActions().playerOneUp && !this.control.getActions().playerOneDown) this.playerOne.move('UP')

    if (this.control.getActions().playerTwoDown && !this.control.getActions().playerTwoUp) this.playerTwo.move('DOWN')
    else if (this.control.getActions().playerTwoUp && !this.control.getActions().playerTwoDown) this.playerTwo.move('UP')

    if (this.control.getActions().enter && !this.playing) this.playing = true;
  }

  draw() {
    this.canvas.clear();
    this.ball.draw();
    this.playerOne.draw();
    this.playerTwo.draw();
    this.goalsPlayerOne.draw();
    this.goalsPlayerTwo.draw();

    if (!this.playing) this.enterToPlay.draw();
  }

  wait() {
    this.timer = 0;
    this.waiting = true;
  }

  isWaiting() {
    if (this.waiting) {
      if (this.timer < 60) {
        this.timer++;
        return true;
      } else {
        this.timer = 0;
        this.waiting = false;
      }
    }
    return false;
  }
}