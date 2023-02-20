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
  collisionBox;

  constructor(canvas, isPlayerOne = true) {
    this.canvas = canvas;
    this.framesCounter = 0;

    this.initialPosition = {
      x: isPlayerOne ? 3 : this.canvas.getGridsQuantity().horizontal - 4,
      y: 14
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

  isColliding(elementsCollisionBox) {
    if (
      this.collisionBox.rightTop.x >= elementsCollisionBox.leftTop.x
      &&
      this.collisionBox.leftTop.x <= elementsCollisionBox.rightTop.x
      &&
      this.collisionBox.leftBottom.y > elementsCollisionBox.leftTop.y
      &&
      this.collisionBox.leftTop.y < elementsCollisionBox.leftBottom.y
    ) {
      return true
    }
    return false
  }

  update(delta) {
    this.framesCounter++;
    if (this.position.y < 0) this.position.y = 0;
    if (this.position.y > this.canvas.getGridsQuantity().vertical - this.size.y) this.position.y = this.canvas.getGridsQuantity().vertical - this.size.y;

    this.collisionBox = {
      leftTop: { x: this.position.x, y: this.position.y },
      rightTop: { x: this.position.x + this.size.x, y: this.position.y },
      rightBottom: { x: this.position.x + this.size.x, y: this.position.y + this.size.y },
      leftBottom: { x: this.position.x, y: this.position.y + this.size.y }
    }
  }

  resetPosition() {
    this.position = this.initialPosition;
  }

  draw() {
    this.canvas.drawRectangle('#FFF', this.position, this.size)
  }


}
