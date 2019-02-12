import CellData from '../entities/CellData';

class GenerateEmptyBoard {
  static execute(boardW, boardH) {
    const newBoard = [];

    for (let row = 0; row < boardH; row += 1) {
      const newRow = [];
      for (let column = 0; column < boardW; column += 1) {
        newRow.push(
          new CellData({
            posX: column,
            posY: row,
            isBomb: 0,
          })
        );
      }
      newBoard.push(newRow);
    }
    return newBoard;
  }
}

export default GenerateEmptyBoard;
