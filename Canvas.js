export class Canvas {
  htmlCanvasElement;
  context;
  size;
  gridSize;

  constructor() {
    this.htmlCanvasElement = document.getElementById('canvas');
    this.context = this.htmlCanvasElement.getContext('2d');

    this.size = {
      width: this.htmlCanvasElement.getAttribute('width'),
      height: this.htmlCanvasElement.getAttribute('height'),
    }

    this.gridSize = {
      width: this.size.width / 10,
      height: this.size.height / 10,
    }

  }

  getContext() {
    return this.context;
  }

  clear() {
    this.context.clearRect(0, 0, this.size, this.width);
  }

  getGridSize() {
    return this.gridSize;
  }

  snapToGrid(vector2Int) {
    return { x: vector2Int.x * this.gridSize.width, y: vector2Int.y * this.gridSize.height }
  }

  drawRectangle(color, position, size) {
    const snappedPosition = this.snapToGrid(position);
    const snappedSize = this.snapToGrid(size);

    this.context.fillStyle = color;
    this.context.fillRect(snappedPosition.x, snappedPosition.y, snappedSize.x, snappedSize.y);
  }
}