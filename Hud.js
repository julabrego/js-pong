export class Hud {
  canvas;
  font;
  value;
  position;

  constructor(canvas) {
    this.canvas = canvas;

    this.font = '40px Arial';
    this.value = 0;
  }

  setPosition(position) {
    this.position = {
      x: position.x,
      y: position.y
    }
  }

  setValue(value) {
    this.value = value;
  }

  getValue() {
    return this.value;
  }

  draw() {
    this.canvas.getContext().font = this.font;
    this.canvas.getContext().fillStyle = '#FFF';
    this.canvas.getContext().textAlign = 'center';
    this.canvas.getContext().fillText(this.value, this.position.x, this.position.y);
  }
}