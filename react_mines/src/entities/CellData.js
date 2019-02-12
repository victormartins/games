export default class CellData {
  constructor(data) {
    this.posX = data.posX;
    this.posY = data.posY;
    this.open = false;
    this.marked = false;
    this.isBomb = data.isBomb;
    this.detectedBombs = undefined;
  }

  get isOpen() {
    return this.open;
  }

  set isOpen(val) {
    this.open = val;
  }
}
