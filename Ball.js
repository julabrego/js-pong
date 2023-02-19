export class Ball {
  canvas
  size = {
    x: 1,
    y: 1
  };
  position;
  initialPosition = {
    x: 3,
    y: 1
  }

  framesCounter;
  framesCounterB;
  speed = {
    x: 15,
    y: 15
  }

  constructor(canvas) {
    this.canvas = canvas;
    this.framesCounter = 0;
    this.framesCounterB = 0;

    this.resetPosition();
  }

  update(delta) {
    this.framesCounter++;
    this.framesCounterB++;

    if (this.framesCounter > 60 / Math.abs(this.speed.x)) {
      this.position.x += this.speed.x > 0 ? 1 : -1;
      this.framesCounter = 0
    }

    if (this.framesCounterB > 60 / Math.abs(this.speed.y)) {
      this.position.y += this.speed.y > 0 ? 1 : -1;
      this.framesCounterB = 0
    }

    if (this.position.x <= 0 || this.position.x >= this.canvas.getGridsQuantity().horizontal - 1) this.speed.x *= -1;
    if (this.position.y <= 0 || this.position.y >= this.canvas.getGridsQuantity().vertical - 1) this.speed.y *= -1;
  }

  resetPosition() {
    this.position = this.initialPosition;
  }

  draw() {
    this.canvas.drawRectangle('#FFF', this.position, this.size)
  }
}