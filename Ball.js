export class Ball {
  canvas
  size = {
    x: 1,
    y: 1
  };
  position;
  initialPosition = {
    x: 4,
    y: 4
  }

  constructor(canvas) {
    this.canvas = canvas;

    this.resetPosition();
  }

  update(delta) {

  }

  resetPosition() {
    this.position = this.initialPosition;
  }

  draw() {
    this.canvas.drawRectangle('#FFF', this.position, this.size)
  }
}