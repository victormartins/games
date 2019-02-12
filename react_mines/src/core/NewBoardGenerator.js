import BombCounter from './BombCounter';
import GenerateEmptyBoard from './GenerateEmptyBoard';

class NewBoardGenerator {
  constructor({ boardW, boardH }) {
    this.boardW = boardW;
    this.boardH = boardH;
  }

  generate(maxBombs) {
    const newBoard = GenerateEmptyBoard.execute(this.boardW, this.boardH);
    this._addBombs(newBoard, maxBombs);
    const boardWithBombCounts = BombCounter.countBombs(
      newBoard,
      this.boardW,
      this.boardH
    );

    return boardWithBombCounts;
  }

  _addBombs(board, maxBombs) {
    for (let index = 0; index < maxBombs; index += 1) {
      let lookForSpace = true;
      // If randomly pick a cell that already is a bomb draw again
      while (lookForSpace) {
        const randomCol = Math.floor(Math.random() * this.boardW);
        const randomRow = Math.floor(Math.random() * this.boardH);
        const cell = board[randomRow][randomCol];
        if (!cell.isBomb) {
          cell.isBomb = true;
          lookForSpace = false;
        }
      }
    }
  }
}

export default NewBoardGenerator;
