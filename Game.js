import { Canvas } from './Canvas.js';
import { Ball } from './Ball.js';

export class Game {
  canvas;
  ball;

  constructor() {
    this.loop = this.loop.bind(this);
    this.canvas = new Canvas();

    this.startGame();

    window.requestAnimationFrame(this.loop);
  }

  loop(timestamp) {
    let delta = timestamp - this.lastRender;

    this.update(delta);
    this.draw();

    this.lastRender = timestamp;
    window.requestAnimationFrame(this.loop);

  }

  startGame() {
    this.ball = new Ball(this.canvas);
  }

  update(delta) {
    //console.log(delta)
  }

  draw() {
    this.canvas.clear();
    this.ball.draw();
  }
}