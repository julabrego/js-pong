export class Ball {
  canvas
  size = {
    x: 1,
    y: 1
  };
  position;
  initialPosition = {
    x: 20,
    y: 13
  }

  framesCounter;
  framesCounterB;
  speed = {
    x: -15,
    y: 15
  }
  collisionBox;
  isBouncing = false;
  isBoundingBounceEnabled = false;
  bouncingCounter = 0;

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
      this.framesCounter = 0;

      if (this.isBouncing) {
        this.bouncingCounter++;
        if (this.bouncingCounter > 2) {
          this.bouncingCounter = 0;
          this.isBouncing = false;
        }
      }
    }

    if (this.framesCounterB > 60 / Math.abs(this.speed.y)) {
      this.position.y += this.speed.y > 0 ? 1 : -1;
      this.framesCounterB = 0;

      if (this.isBouncing) {
        this.bouncingCounter++;
        if (this.bouncingCounter > 2) {
          this.bouncingCounter = 0;
          this.isBouncing = false;
        }
      }
    }

    if (this.isBoundingBounceEnabled) {
      if (this.position.x <= 0 || this.position.x >= this.canvas.getGridsQuantity().horizontal - 1) this.speed.x *= -1;
    }
    if (this.position.y <= 0 || this.position.y >= this.canvas.getGridsQuantity().vertical - 1) this.speed.y *= -1;

    this.collisionBox = {
      leftTop: { x: this.position.x, y: this.position.y },
      rightTop: { x: this.position.x + this.size.x, y: this.position.y },
      rightBottom: { x: this.position.x + this.size.x, y: this.position.y + this.size.y },
      leftBottom: { x: this.position.x, y: this.position.y + this.size.y }
    }
  }

  bounce() {
    if (!this.isBouncing) {
      this.speed.x *= -1;
      this.isBouncing = true;
    }
  }

  resetPosition() {
    this.position = { x: this.initialPosition.x, y: this.initialPosition.y };
  }

  getPosition() {
    return this.position;
  }

  getSize() {
    return this.size;
  }

  getCollisionBox() {
    return this.collisionBox;
  }

  isPlayerTwoGoal() {
    return this.position.x < 0;
  }

  isPlayerOneGoal() {
    return this.position.x > this.canvas.getGridsQuantity().horizontal;
  }

  draw() {
    this.canvas.drawRectangle('#FFF', this.position, this.size)
  }
}