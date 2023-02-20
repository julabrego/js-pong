import { Canvas } from './Canvas.js';
import { Ball } from './Ball.js';
import { Stick } from './Stick.js';
import { Control } from './Control.js';

export class Game {
  canvas;
  ball;
  playerOne;
  playerTwo;
  control;

  constructor() {
    this.loop = this.loop.bind(this);
    this.canvas = new Canvas();

    this.control = new Control();

    this.startGame();

    window.requestAnimationFrame(this.loop);
  }

  loop(timestamp) {
    let delta = timestamp - this.lastRender;

    this.handleEvents();
    this.update(delta);
    this.draw();

    this.lastRender = timestamp;
    window.requestAnimationFrame(this.loop);

  }

  startGame() {
    this.ball = new Ball(this.canvas);

    this.playerOne = new Stick(this.canvas);
    this.playerTwo = new Stick(this.canvas, false);
  }

  update(delta) {
    this.ball.update(delta);
    this.playerOne.update(delta);
    this.playerTwo.update(delta);

    this.handleCollisions();
  }

  handleCollisions() {
    if (this.playerOne.isColliding(this.ball.getCollisionBox())) this.ball.bounce();
    if (this.playerTwo.isColliding(this.ball.getCollisionBox())) this.ball.bounce();
  }

  handleEvents() {
    if (this.control.getActions().playerOneDown && !this.control.getActions().playerOneUp) this.playerOne.move('DOWN')
    else if (this.control.getActions().playerOneUp && !this.control.getActions().playerOneDown) this.playerOne.move('UP')

    if (this.control.getActions().playerTwoDown && !this.control.getActions().playerTwoUp) this.playerTwo.move('DOWN')
    else if (this.control.getActions().playerTwoUp && !this.control.getActions().playerTwoDown) this.playerTwo.move('UP')
  }

  draw() {
    this.canvas.clear();
    this.ball.draw();
    this.playerOne.draw();
    this.playerTwo.draw();
  }
}