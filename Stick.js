export class Stick {
  canvas;
  size = {
    x: 1,
    y: 4
  };
  position;
  initialPosition;

  framesCounter;
  speed = 30;

  constructor(canvas, isPlayerOne = true) {
    this.canvas = canvas;
    this.framesCounter = 0;

    this.initialPosition = {
      x: isPlayerOne && 3,
      y: isPlayerOne && 14
    };

    this.resetPosition();
  }

  move(direction) {
    switch (direction) {
      case 'UP':
        if (this.framesCounter > 60 / Math.abs(this.speed)) {
          this.position.y--;
          this.framesCounter = 0
        }
        break;
      case 'DOWN':
        if (this.framesCounter > 60 / Math.abs(this.speed)) {
          this.position.y++;
          this.framesCounter = 0
        }
        break;
      default:
        console.log('player one is idle');
    }
  }

  update(delta) {
    this.framesCounter++;
    if (this.position.y < 0) this.position.y = 0;
    if (this.position.y > this.canvas.getGridsQuantity().vertical - this.size.y) this.position.y = this.canvas.getGridsQuantity().vertical - this.size.y;
  }

  resetPosition() {
    this.position = this.initialPosition;
  }

  draw() {
    this.canvas.drawRectangle('#FFF', this.position, this.size)
  }
}
